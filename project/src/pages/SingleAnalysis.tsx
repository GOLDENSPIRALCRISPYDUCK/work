import React, { useState } from 'react';
import { Upload, Activity, RefreshCw } from 'lucide-react';

const SingleAnalysis = () => {
    const [leftEyeImage, setLeftEyeImage] = useState<string | null>(null);
    const [rightEyeImage, setRightEyeImage] = useState<string | null>(null);

    const handleImageUpload = (eye: 'left' | 'right') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (eye === 'left') {
                    setLeftEyeImage(reader.result as string);
                } else {
                    setRightEyeImage(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleResetAll = () => {
        setLeftEyeImage(null);
        setRightEyeImage(null);
    };

    const ImageUploadSection = ({ eye, image, onUpload }: {
        eye: 'left' | 'right',
        image: string | null,
        onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void,
    }) => (
        <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">{eye === 'left' ? '左眼' : '右眼'}眼底影像</h2>
            <div className="aspect-[4/3] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50">
                {image ? (
                    <img
                        src={image}
                        alt={`${eye === 'left' ? '左眼' : '右眼'}影像`}
                        className="max-w-full max-h-full object-contain"
                    />
                ) : (
                    <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <label className="mt-4 cursor-pointer">
                            <span className="mt-2 block text-sm font-semibold text-blue-600">
                                上传{eye === 'left' ? '左眼' : '右眼'}图片
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={onUpload}
                            />
                        </label>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">单片影像分析</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <ImageUploadSection
                    eye="left"
                    image={leftEyeImage}
                    onUpload={handleImageUpload('left')}
                />
                <ImageUploadSection
                    eye="right"
                    image={rightEyeImage}
                    onUpload={handleImageUpload('right')}
                />
            </div>

            <div className="border rounded-lg p-6 bg-white shadow-md">
                <h2 className="text-xl font-semibold mb-4">综合诊断结果</h2>
                <div className="text-center text-gray-500 py-12">
                    <Activity className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2">需要上传两眼图像后才能生成综合诊断</p>
                </div>
                <button
                    onClick={handleResetAll}
                    className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-100 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>重新上传所有图片</span>
                </button>
            </div>
        </div>
    );
}

export default SingleAnalysis;
