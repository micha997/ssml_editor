const story = {
    title: "Story Title",
    tts_settings: {
        voice: {
            languageCode: "de-DE",
            name: "de-DE-Wavenet-F"
        },
        audioConfig: {
            audioEncoding: "MP3",
            pitch: 0,
            speakingRate: 1
        }
    },
    slides: [
        {
            title: "Home Slide",
            tts_settings: {
                voice: {
                    languageCode: "de-DE",
                    name: "de-DE-Wavenet-F"
                },
                audioConfig: {
                    audioEncoding: "MP3",
                    pitch: 0,
                    speakingRate: 1
                }
            },
            layers: [
                {
                    title: "Base Layer",
                    entries: [
                        {
                            title: "Intro",
                            input: {
                                ssml: "<speak>Hallo</speak>"
                            }
                        },
                        {
                            title: "Other",
                            tts_settings: {
                                voice: {
                                    languageCode: "de-DE",
                                    name: "de-DE-Wavenet-F"
                                },
                                audioConfig: {
                                    audioEncoding: "MP3",
                                    pitch: 0,
                                    speakingRate: 1
                                }
                            },
                            input: {
                                text: "Hallo"
                            }
                        }
                    ]
                }
            ]
        },
        {
            title: "Intro Slide",
            tts_settings: {
                voice: {
                    languageCode: "de-DE",
                    name: "de-DE-Wavenet-F"
                },
                audioConfig: {
                    audioEncoding: "MP3",
                    pitch: 0,
                    speakingRate: 1
                }
            },
            layers: [
                {
                    title: "Base Layer",
                    entries: [
                        {
                            title: "Intro",
                            input: {
                                ssml: "<speak>Hallo</speak>"
                            }
                        },
                        {
                            title: "Other",
                            tts_settings: {
                                voice: {
                                    languageCode: "de-DE",
                                    name: "de-DE-Wavenet-F"
                                },
                                audioConfig: {
                                    audioEncoding: "MP3",
                                    pitch: 0,
                                    speakingRate: 1
                                }
                            },
                            input: {
                                text: "Hallo"
                            }
                        }
                    ]
                }
            ]
        },
        {
            title: "Explanation Slide",
            tts_settings: {
                voice: {
                    languageCode: "de-DE",
                    name: "de-DE-Wavenet-F"
                },
                audioConfig: {
                    audioEncoding: "MP3",
                    pitch: 0,
                    speakingRate: 1
                }
            },
            layers: []
        }
    ]
}

export default story