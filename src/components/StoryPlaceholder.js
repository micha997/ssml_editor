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
            active: false,
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
            ],
            layers: [
                {
                    title: "Base Layer",
                    active: false,
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
            active: false,
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
            ],
            layers: [
                {
                    title: "Base Layer",
                    active: false,
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
            active: false,
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
            ],
            layers: []
        }
    ]
}

export default story