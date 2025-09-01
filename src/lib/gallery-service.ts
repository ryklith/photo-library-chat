/**
 * Gallery Service
 * 
 * Handles extracting and processing gallery information from webhook responses
 */

export interface GalleryImage {
  id: string;
  url: string;
  originalUrl: string;
  description: string;
  score: number;
  filename: string;
  metadata: {
    activities?: string[];
    age_groups?: string[];
    event_type?: string[];
    num_people?: number;
    photo_quality?: number;
    photo_setting?: string;
    mood?: number;
    objects?: string[];
    [key: string]: any;
  };
}

export interface GalleryData {
  images: GalleryImage[];
  query?: string;
  totalResults?: number;
  timestamp: Date;
}

export class GalleryService {
  /**
   * Extract gallery data from webhook response
   */
  extractGalleryData(response: any): GalleryData | null {
    try {
      console.log('🔍 Extracting gallery data from response:', JSON.stringify(response, null, 2));
      
      // Check if response has intermediateSteps with matches
      if (response.intermediateSteps && Array.isArray(response.intermediateSteps)) {
        console.log('📋 Found intermediateSteps, checking for matches...');
        for (const step of response.intermediateSteps) {
          if (step.observation && typeof step.observation === 'string') {
            try {
              const observationData = JSON.parse(step.observation);
              if (observationData && Array.isArray(observationData)) {
                for (const item of observationData) {
                  if (item.matches && Array.isArray(item.matches)) {
                    console.log('✅ Found matches in intermediateSteps:', item.matches.length);
                    return this.processMatches(item.matches, response.output);
                  }
                }
              }
            } catch (parseError) {
              console.warn('Failed to parse observation data:', parseError);
            }
          }
        }
      }

      // Check if response has direct gallery data
      if (response.gallery && response.gallery.images) {
        console.log('✅ Found direct gallery data:', response.gallery.images.length, 'images');
        return {
          images: response.gallery.images.map((img: any) => this.normalizeImage(img)),
          query: response.gallery.query,
          totalResults: response.gallery.totalResults,
          timestamp: new Date()
        };
      }

      // Check if response has nested gallery data in output
      if (response.output && response.output.gallery && response.output.gallery.images) {
        console.log('✅ Found nested gallery data in output:', response.output.gallery.images.length, 'images');
        return {
          images: response.output.gallery.images.map((img: any) => this.normalizeImage(img)),
          query: response.output.gallery.query,
          totalResults: response.output.gallery.totalResults,
          timestamp: new Date()
        };
      }

      console.log('❌ No gallery data found in response');
      return null;
    } catch (error) {
      console.error('Error extracting gallery data:', error);
      return null;
    }
  }

  /**
   * Process matches from intermediateSteps
   */
  private processMatches(matches: any[], query?: string): GalleryData {
    const images: GalleryImage[] = matches.map(match => this.normalizeImage(match));
    
    return {
      images,
      query,
      totalResults: matches.length,
      timestamp: new Date()
    };
  }

  /**
   * Generate thumbnail URL from original image URL
   */
  private generateThumbnailUrl(originalUrl: string): string {
    if (!originalUrl) return '';
    
    try {
      const url = new URL(originalUrl);
      const pathParts = url.pathname.split('/');
      const filename = pathParts[pathParts.length - 1];
      
      // Insert 'thumbnails' before the filename
      pathParts.splice(-1, 0, 'thumbnails');
      
      return `${url.protocol}//${url.host}${pathParts.join('/')}`;
    } catch (error) {
      console.warn('Failed to generate thumbnail URL:', error);
      return originalUrl; // Fallback to original URL
    }
  }

  /**
   * Normalize image data to consistent format
   */
  private normalizeImage(match: any): GalleryImage {
    const originalUrl = match.metadata?.url || match.url || '';
    const thumbnailUrl = this.generateThumbnailUrl(originalUrl);
    
    return {
      id: match.id || `img-${Date.now()}-${Math.random()}`,
      url: thumbnailUrl, // Use thumbnail URL for gallery display
      originalUrl: originalUrl, // Keep original URL for full-size view
      description: match.metadata?.description || match.description || 'No description available',
      score: match.score || 0,
      filename: match.metadata?.filename || match.filename || 'unknown.jpg',
      metadata: {
        activities: match.metadata?.activities || [],
        age_groups: match.metadata?.age_groups || [],
        event_type: match.metadata?.event_type || [],
        num_people: match.metadata?.num_people || 0,
        photo_quality: match.metadata?.photo_quality || 0,
        photo_setting: match.metadata?.photo_setting || '',
        mood: match.metadata?.mood || 0,
        objects: match.metadata?.objects || [],
        ...match.metadata
      }
    };
  }

  /**
   * Filter images by criteria
   */
  filterImages(images: GalleryImage[], filters: {
    minScore?: number;
    maxPeople?: number;
    activities?: string[];
    eventTypes?: string[];
  }): GalleryImage[] {
    return images.filter(image => {
      if (filters.minScore && image.score < filters.minScore) return false;
      if (filters.maxPeople && (image.metadata.num_people ?? 0) > filters.maxPeople) return false;
      if (filters.activities && filters.activities.length > 0) {
        const hasActivity = filters.activities.some(activity => 
          image.metadata.activities?.includes(activity)
        );
        if (!hasActivity) return false;
      }
      if (filters.eventTypes && filters.eventTypes.length > 0) {
        const hasEventType = filters.eventTypes.some(eventType => 
          image.metadata.event_type?.includes(eventType)
        );
        if (!hasEventType) return false;
      }
      return true;
    });
  }

  /**
   * Sort images by criteria
   */
  sortImages(images: GalleryImage[], sortBy: 'score' | 'date' | 'people' | 'quality' = 'score'): GalleryImage[] {
    return [...images].sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'people':
          return ((b.metadata.num_people ?? 0) - (a.metadata.num_people ?? 0));
        case 'quality':
          return (b.metadata.photo_quality || 0) - (a.metadata.photo_quality || 0);
        default:
          return 0;
      }
    });
  }
}

// Export singleton instance
export const galleryService = new GalleryService();
