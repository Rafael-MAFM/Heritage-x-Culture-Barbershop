// Google Cloud Storage integration for gallery images
// Note: In production, you'll want to handle uploads through a secure backend

export interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  category?: string;
  barber_id?: string;
  is_featured: boolean;
  uploaded_at: string;
  contentType?: string; // Add content type to distinguish images from videos
}

// Mock data for development
export const mockGalleryImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Classic Scissor Cut',
    category: 'haircuts',
    is_featured: true,
    uploaded_at: new Date().toISOString(),
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Beard Grooming',
    category: 'beard',
    is_featured: false,
    uploaded_at: new Date().toISOString(),
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Modern Fade',
    category: 'haircuts',
    is_featured: true,
    uploaded_at: new Date().toISOString(),
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Buzz Cut',
    category: 'haircuts',
    is_featured: false,
    uploaded_at: new Date().toISOString(),
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Classic Style',
    category: 'haircuts',
    is_featured: false,
    uploaded_at: new Date().toISOString(),
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Modern Styling',
    category: 'styling',
    is_featured: true,
    uploaded_at: new Date().toISOString(),
  },
  {
    id: '7',
    url: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Full Service',
    category: 'full-service',
    is_featured: false,
    uploaded_at: new Date().toISOString(),
  },
  {
    id: '8',
    url: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Creative Cut',
    category: 'creative',
    is_featured: true,
    uploaded_at: new Date().toISOString(),
  },
  {
    id: '9',
    url: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Professional Styling',
    category: 'styling',
    is_featured: false,
    uploaded_at: new Date().toISOString(),
  },
  {
    id: '10',
    url: 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Hot Towel Shave',
    category: 'shave',
    is_featured: true,
    uploaded_at: new Date().toISOString(),
  },
  {
    id: '11',
    url: 'https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Signature Cut',
    category: 'haircuts',
    is_featured: false,
    uploaded_at: new Date().toISOString(),
  },
  {
    id: '12',
    url: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Premium Service',
    category: 'premium',
    is_featured: true,
    uploaded_at: new Date().toISOString(),
  },
];

// Configuration
export const GCS_CONFIG = {
  bucketName: import.meta.env.VITE_GCS_BUCKET || 'heritage-culture-gallery',
  projectId: import.meta.env.VITE_GCS_PROJECT_ID || '',
};

// Check if GCS is properly configured
export const isGCSConfigured = () => {
  return import.meta.env.VITE_GCS_PROJECT_ID && 
         import.meta.env.VITE_GCS_PROJECT_ID !== 'your_project_id_here' &&
         import.meta.env.VITE_GCS_BUCKET;
};

// Helper functions for Google Cloud Storage
export const generateGCSUrl = (fileName: string) => {
  return `https://storage.googleapis.com/${GCS_CONFIG.bucketName}/${fileName}`;
};

export const getImageCategories = () => {
  return ['all', 'haircuts', 'beard', 'styling', 'shave', 'creative', 'full-service', 'premium'];
};

// Fetch images and videos directly from Google Cloud Storage bucket
export const fetchFromGCS = async (category?: string): Promise<GalleryImage[]> => {
  try {
    const apiUrl = `https://storage.googleapis.com/storage/v1/b/${GCS_CONFIG.bucketName}/o`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`GCS bucket "${GCS_CONFIG.bucketName}" not found or not public`);
        return mockGalleryImages.filter(img => !category || category === 'all' || img.category === category);
      }
      throw new Error(`GCS API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return mockGalleryImages.filter(img => !category || category === 'all' || img.category === category);
    }
    
    // Convert GCS objects to GalleryImage format
    const gcsImages: GalleryImage[] = data.items
      .filter((item: any) => {
        // Include both images and videos (not folders)
        const isMediaFile = (item.contentType?.startsWith('image/') || item.contentType?.startsWith('video/')) && 
                           !item.name.endsWith('/') && 
                           item.name.includes('.'); // Must have file extension
        return isMediaFile;
      })
      .map((item: any, index: number) => {
        const fileName = item.name;
        
        // Extract category from folder structure (e.g., "haircuts/image.jpg" -> "haircuts")
        let imageCategory = 'haircuts'; // default
        if (fileName.includes('/')) {
          const folderName = fileName.split('/')[0].toLowerCase();
          
          // Map folder names to our category system
          if (folderName === 'beard') imageCategory = 'beard';
          else if (folderName === 'styling') imageCategory = 'styling';
          else if (folderName === 'shave') imageCategory = 'shave';
          else if (folderName === 'creative') imageCategory = 'creative';
          else if (folderName.includes('service')) imageCategory = 'full-service';
          else if (folderName === 'premium') imageCategory = 'premium';
          else if (folderName === 'haircuts') imageCategory = 'haircuts';
          else {
            imageCategory = folderName.replace(/\s+/g, '-');
          }
        }
        
        // Extract clean title from filename
        const fileNamePart = fileName.includes('/') ? fileName.split('/').pop() : fileName;
        const title = fileNamePart?.split('.')[0].replace(/[-_]/g, ' ') || 'Media';
        
        const mediaUrl = `https://storage.googleapis.com/${GCS_CONFIG.bucketName}/${encodeURIComponent(item.name)}`;
        
        return {
          id: item.etag || `gcs-${Date.now()}-${index}`,
          url: mediaUrl,
          title: title.charAt(0).toUpperCase() + title.slice(1),
          category: imageCategory,
          is_featured: index < 4,
          uploaded_at: item.timeCreated || new Date().toISOString(),
          contentType: item.contentType, // Add content type to distinguish images from videos
        };
      });
    
    // Filter by category if specified
    const filteredImages = category && category !== 'all' 
      ? gcsImages.filter(img => img.category === category)
      : gcsImages;
    
    return filteredImages.sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime());
    
  } catch (error) {
    console.error('Error fetching from GCS:', error);
    return mockGalleryImages.filter(img => !category || category === 'all' || img.category === category);
  }
};

// Mock functions - Fallback for development
export const fetchGalleryImages = async (category?: string): Promise<GalleryImage[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let images = mockGalleryImages;
  
  if (category && category !== 'all') {
    images = images.filter(img => img.category === category);
  }
  
  return images.sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime());
};

export const uploadToGCS = async (file: File, metadata: Partial<GalleryImage>): Promise<GalleryImage | null> => {
  try {
    console.log('Uploading to GCS:', { file: file.name, metadata });
    
    // Generate a unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const categoryPrefix = metadata.category || 'haircuts';
    const fileName = `${categoryPrefix}/${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    // Create FormData for the upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', fileName);
    
    // In a real implementation, you'd upload through a secure backend endpoint
    // For now, we'll simulate this and create a URL that would work
    console.log('Would upload file to:', `gs://${GCS_CONFIG.bucketName}/${fileName}`);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create the image object with the GCS URL
    const newImage: GalleryImage = {
      id: timestamp.toString(),
      url: `https://storage.googleapis.com/${GCS_CONFIG.bucketName}/${fileName}`,
      title: metadata.title || file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, ' '),
      category: metadata.category || 'haircuts',
      barber_id: metadata.barber_id,
      is_featured: metadata.is_featured || false,
      uploaded_at: new Date().toISOString(),
    };
    
    console.log('Upload successful (simulated):', newImage);
    return newImage;
    
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
};

export const deleteFromGCS = async (imageId: string): Promise<boolean> => {
  // Mock delete operation
  console.log('Mock delete:', imageId);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

// URL helpers
export const isGCSUrl = (url: string): boolean => {
  return url.includes('storage.googleapis.com') || url.includes('storage.cloud.google.com');
};

export const optimizeImageUrl = (url: string, width?: number, height?: number): string => {
  // If it's a GCS URL, you can add transformation parameters
  if (isGCSUrl(url)) {
    // Google Cloud Storage doesn't natively support URL transformations
    // You might use a service like Cloudflare Images or implement your own resizing
    return url;
  }
  
  // For other URLs (like Pexels), add optimization parameters if supported
  if (url.includes('pexels.com') && (width || height)) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('auto', 'compress');
    params.set('cs', 'tinysrgb');
    
    return `${url.split('?')[0]}?${params.toString()}`;
  }
  
  return url;
};