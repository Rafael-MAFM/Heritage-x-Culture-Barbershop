import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image, AlertCircle, CheckCircle } from 'lucide-react';
import { useGallery } from '../../hooks/useGallery';
import { getImageCategories } from '../../lib/googleStorage';

interface ImageUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ isOpen, onClose }) => {
  const { uploadImage, uploading } = useGallery();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [metadata, setMetadata] = useState({
    title: '',
    category: 'haircuts',
    is_featured: false,
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

  const categories = getImageCategories().filter(cat => cat !== 'all');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setFile(selectedFile);
      setError('');
      
      // Generate preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
      
      // Auto-generate title from filename
      if (!metadata.title) {
        const title = selectedFile.name
          .split('.')[0]
          .replace(/[^a-zA-Z0-9]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        setMetadata(prev => ({ ...prev, title }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setError('');
    
    try {
      const success = await uploadImage(file, metadata);
      if (success) {
        setUploadSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setError('Upload failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreview(null);
    setMetadata({ title: '', category: 'haircuts', is_featured: false });
    setUploadSuccess(false);
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <Upload className="w-6 h-6" />
                <span>Upload to Gallery</span>
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success State */}
            {uploadSuccess && (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-700 mb-2">Upload Successful!</h3>
                <p className="text-gray-600">Your image has been added to the gallery</p>
              </motion.div>
            )}

            {/* Upload Form */}
            {!uploadSuccess && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-400 transition-colors">
                    {preview ? (
                      <div className="space-y-4">
                        <img
                          src={preview}
                          alt="Preview"
                          className="max-w-full max-h-48 mx-auto rounded-lg object-cover"
                        />
                        <div className="text-sm text-gray-600">
                          {file?.name} ({(file?.size || 0 / 1024 / 1024).toFixed(1)} MB)
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setPreview(null);
                          }}
                          className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                        >
                          Change Image
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <div className="text-gray-600 mb-2">
                          Drop an image here, or{' '}
                          <label className="text-yellow-600 hover:text-yellow-700 cursor-pointer font-medium">
                            browse files
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                        <div className="text-xs text-gray-500">
                          Supports JPG, PNG, WebP up to 10MB
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Metadata Fields */}
                {file && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Title
                      </label>
                      <input
                        type="text"
                        value={metadata.title}
                        onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="Enter image title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={metadata.category}
                        onChange={(e) => setMetadata(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={metadata.is_featured}
                        onChange={(e) => setMetadata(prev => ({ ...prev, is_featured: e.target.checked }))}
                        className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500"
                      />
                      <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                        Mark as featured image
                      </label>
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={!file || uploading}
                  className="w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  whileHover={{ scale: !file || uploading ? 1 : 1.02 }}
                  whileTap={{ scale: !file || uploading ? 1 : 0.98 }}
                >
                  <Upload className="w-5 h-5" />
                  <span>{uploading ? 'Uploading...' : 'Upload to Gallery'}</span>
                </motion.button>
              </form>
            )}

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Upload Process:</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p>• Images will be stored in Google Cloud Storage bucket: <code>heritage-culture-gallery</code></p>
                <p>• Files are organized by category in folders</p>
                <p>• Metadata is saved to Supabase for fast searching</p>
                <p>• Images become immediately visible in gallery</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageUpload;