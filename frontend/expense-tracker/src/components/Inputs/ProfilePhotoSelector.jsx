import React, { useState, useRef } from 'react';
import { LuUser, LuPencil } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex justify-center md:justify-center -ml-3">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            <div className="relative cursor-pointer w-14 h-14" onClick={onChooseFile}>
                {!image ? (
                    <div className="w-15 h-15 flex items-center justify-center bg-violet-300 rounded-full">
                        <LuUser className="text-4xl text-blue-800" />
                    </div>
                ) : (
                    <img
                        src={previewUrl}
                        alt="profile"
                        className="w-15 h-15 rounded-full object-cover"
                    />
                )}

                {/* Pencil icon overlay */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border border-gray-300 flex items-center justify-center shadow">
                    <LuPencil className="text-[12px] text-black-600" />
                </div>
            </div>
        </div>
    );
};

export default ProfilePhotoSelector;

