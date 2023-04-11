export function getCoords(): Promise<{lat: number, lon: number}> {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                })
            },
            (error) => {
                let msg;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        msg = "Lokalizacja zablokowana przez użytkownika.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        msg = "Lokalizacja jest niedostępna.";
                        break;
                    default: {
                        msg = "Lokalizacja jest niedostępna.";
                        break;
                    }
                }
                reject(msg);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            });
    });
}