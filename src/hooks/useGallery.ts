import { useState, useEffect } from 'react';
import { fetchGalleryImages, fetchFromGCS, GalleryImage, getImageCategories, uploadToGCS, deleteFromGCS } from '../lib/googleStorage';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useGallery = () => {
  const { user, profile } = useAuth();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploading, setUploading] = useState(false);

  // Fetch images from Google Cloud Storage directly
  const loadImages = async (category?: string) => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from Supabase first (for metadata)
      let query = supabase
        .from('gallery_images')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        // Map Supabase data to our GalleryImage interface
        const galleryImages: GalleryImage[] = data.map(item => ({
          id: item.id,
          url: item.gcs_url,
          title: item.title,
          category: item.category,
          barber_id: item.barber_id,
          is_featured: item.is_featured,
          uploaded_at: item.uploaded_at,
        }));
        setImages(galleryImages);
      } else {
        // No data in Supabase or error, try to fetch directly from GCS
        console.log('No Supabase data, attempting to fetch from GCS bucket...');
        const gcsImages = await fetchFromGCS(category);
        setImages(gcsImages);
      }
    } catch (err: any) {
      console.error('Error loading gallery images:', err);
      setError('Failed to load gallery images from Google Cloud Storage');
      
      // Last resort: use mock data
      try {
        console.warn('Falling back to mock data');
        const mockImages = await fetchGalleryImages(category);
        setImages(mockImages);
      } catch (mockErr) {
        console.error('Mock data also failed:', mockErr);
        setImages([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Upload new image
  const uploadImage = async (
    file: File,
    metadata: { title?: string; category?: string; barber_id?: string; is_featured?: boolean }
  ): Promise<boolean> => {
    if (!user || !profile || profile.role !== 'admin') {
      setError('Only admins can upload images');
      return false;
    }

    setUploading(true);
    setError(null);

    try {
      // First upload to Google Cloud Storage (mock for now)
      const uploadedImage = await uploadToGCS(file, metadata);
      
      if (!uploadedImage) {
        throw new Error('Failed to upload image');
      }

      // Then save to Supabase
      const { error: supabaseError } = await supabase
        .from('gallery_images')
        .insert({
          gcs_url: uploadedImage.url,
          title: uploadedImage.title,
          category: uploadedImage.category,
          barber_id: uploadedImage.barber_id,
          is_featured: uploadedImage.is_featured,
        });

      if (supabaseError) {
        console.warn('Supabase save failed:', supabaseError);
        // Still show success since upload worked
      }

      // Refresh the gallery
      await loadImages(selectedCategory);
      
      return true;
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image');
      return false;
    } finally {
      setUploading(false);
    }
  };

  // Delete image
  const deleteImage = async (imageId: string): Promise<boolean> => {
    if (!user || !profile || profile.role !== 'admin') {
      setError('Only admins can delete images');
      return false;
    }

    try {
      // Delete from Google Cloud Storage
      await deleteFromGCS(imageId);

      // Delete from Supabase
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', imageId);

      if (error) {
        console.warn('Supabase delete failed:', error);
      }

      // Remove from local state
      setImages(prev => prev.filter(img => img.id !== imageId));
      
      return true;
    } catch (err: any) {
      console.error('Delete error:', err);
      setError(err.message || 'Failed to delete image');
      return false;
    }
  };

  // Filter images by category
  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    loadImages(category);
  };

  // Get featured images
  const getFeaturedImages = () => {
    return images.filter(img => img.is_featured);
  };

  // Get images by barber
  const getImagesByBarber = (barberId: string) => {
    return images.filter(img => img.barber_id === barberId);
  };

  // Initialize gallery on mount
  useEffect(() => {
    loadImages();
  }, []);

  return {
    images,
    loading,
    error,
    uploading,
    selectedCategory,
    categories: getImageCategories(),
    loadImages,
    uploadImage,
    deleteImage,
    filterByCategory,
    getFeaturedImages,
    getImagesByBarber,
    canUpload: user && profile?.role === 'admin',
    canDelete: user && profile?.role === 'admin',
  };
};