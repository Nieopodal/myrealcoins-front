import exif from 'exifr'
export const getLocationFromImageHandler = async (file: File): Promise<{
    outputLat: number;
    outputLon: number;
} | null> => {
    try {
        const exifData = await exif.gps(file);
        return exifData ? {
            outputLat: Number(exifData.latitude.toFixed(8)),
            outputLon: Number(exifData.longitude.toFixed(8)),
        } : null;
    } catch(e) {
        return null;
    }
};