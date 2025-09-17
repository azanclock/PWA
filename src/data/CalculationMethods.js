export const CalculationMethods = {
    Algerian: { name: 'Algerian Ministry of Religous Affairs', params: { fajr: 18, isha: 17 }, methodOffsets: {} },
    Egypt: { name: 'Egyptian General Authority of Survey', params: { fajr: 19.5, isha: 17.5 }, methodOffsets: {} },
    FranceAngle18: { name: 'France - 18° Angle', params: { fajr: 18, isha: 18 }, methodOffsets: {} },
    FranceUOIFAngle12: { name: 'France UOIF - 12° Angle', params: { fajr: 12, isha: 12 }, methodOffsets: {} },
    ISNA: { name: 'ISNA (Islamic Society of North America)', params: { fajr: 15, isha: 15 }, methodOffsets: {} },
    JAKIM: { name: 'Jabatan Kemajuan Islam Malaysia', params: { fajr: 20, isha: 18 }, methodOffsets: {} },
    Jordan: { name: 'Jordan Ministry of Awqaf', params: { fajr: 18, isha: 18 }, methodOffsets: { maghrib: 5 } },
    KEMENAG: { name: 'Kementrian Agama Indonesia', params: { fajr: 20, isha: 18 }, methodOffsets: {} },
    Kuwait: { name: 'Kuwait', params: { fajr: 18, isha: 17.5 }, methodOffsets: {} },
    UIPTL: { name: 'London Unified Islamic Prayer Timetable', params: { fajr: 12, isha: 12 }, methodOffsets: {} },
    MUIS: { name: 'Majlis Ugama Islam Singapura', params: { fajr: 20, isha: 18 }, methodOffsets: {} },
    MoonSightingCommittee: { name: 'Moon Sighting Committee', params: { fajr: 18, isha: 18 }, methodOffsets: { dhuhr: 5, maghrib: 3 } },
    MWL: { name: 'Muslim World League', params: { fajr: 18, isha: 17 }, methodOffsets: {} },
    Qatar: { name: 'Qatar', params: { fajr: 18, isha: '90 min' }, methodOffsets: {} },
    Karachi: { name: 'University of Islamic Sciences, Karachi', params: { fajr: 18, isha: 18 }, methodOffsets: {} },
    Makkah: { name: 'Umm Al-Qura University, Makkah', params: { fajr: 18.5, isha: '90 min' }, methodOffsets: {} },
    Dubai: { name: 'UAE / Dubai', params: { fajr: 18.2, isha: 18.2 }, methodOffsets: {} },
    Tunusian: { name: 'Tunisian Ministry of Religous Affairs', params: { fajr: 18, isha: 18 }, methodOffsets: {} },
    TurkiyeDiyanet: { name: 'Türkiye Diyanet İşleri Baskanlığı', params: { fajr: 18, isha: 17 }, methodOffsets: { sunrise: -7, fajr: -1, dhuhr: 5, asr: 5, maghrib: 8, isha: 1 } },
    Diyanet15Degrees: { name: 'Turkish Diyanet Offsets with 15° Angles', params: { fajr: 15, isha: 15 }, methodOffsets: { imsak: -1, sunrise: -9, dhuhr: 5, asr: 5, maghrib: 7, isha: -1 } },
    Tehran: { name: 'University of Tehran', params: { fajr: 17.7, isha: 14, maghrib: 5.5, midnight: 'Jafari' }, methodOffsets: {} }
}

export const AsrCalculationMethods = [
    { id: 'S', name: 'Standard' },
    { id: 'H', name: 'Hanafi Late Asr' }
];

export const DuhaDefaultOffset = 15;
export const DuhaendDefaultOffset = -10;

