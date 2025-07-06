const xlsx = require('xlsx');
const Income = require('../model/income');

// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // formatted date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Create a buffer
        const excelBuffer = xlsx.write(wb, {
            type: "buffer",
            bookType: "xlsx"
        });

        // Set headers
        res.setHeader(
            'Content-Disposition',
            'attachment; filename="income_details.xlsx"'
        );
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        // Send the buffer
        res.send(excelBuffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
