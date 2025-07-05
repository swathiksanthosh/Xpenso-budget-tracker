const Income = require("../model/income");
const Expense = require("../model/expense");
const { Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Fetch Total income and expense
    const totalIncomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = totalIncomeAgg[0]?.total || 0;
    const totalExpense = totalExpenseAgg[0]?.total || 0;

    // Last 60 days income
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    })
      .sort({ date: -1 })
      .lean();

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 30 days expense
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    })
      .sort({ date: -1 })
      .lean();

    const expensesLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Recent Transactions (both income + expense)
    const incomeTxns = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .lean();

    const expenseTxns = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .lean();

    const lastTransactions = [
      ...incomeTxns.map((txn) => ({
        _id: txn._id,
        category: txn.category,
        amount: txn.amount,
        date: txn.date,
        type: "income",
      })),
      ...expenseTxns.map((txn) => ({
        _id: txn._id,
        category: txn.category,
        amount: txn.amount,
        date: txn.date,
        type: "expense",
      })),
    ].sort((a, b) => b.date - a.date);

    // Final Response
    res.json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense, // ✅ correct property name
      last30DaysExpenses: {
        total: expensesLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
