"""
Era-Specific Guidelines for Historical Image Generation
========================================================
This module provides detailed historical accuracy guidelines for each era
covered in the 51 history lessons (1565-1920).

Usage:
    from era_guidelines import get_era_guidelines, get_avoid_list

    guidelines = get_era_guidelines(1565)  # Returns Spanish Colonial guidelines
    avoid = get_avoid_list(1620)  # Returns list of anachronisms to avoid
"""

ERA_GUIDELINES = {
    # =========================================================================
    # ERA 1: SPANISH COLONIAL (1565-1600)
    # Lessons: 1
    # =========================================================================
    "spanish_colonial": {
        "years": (1565, 1600),
        "name": "Spanish Colonial Florida",
        "lessons": [1],

        "clothing": {
            "spanish_male": {
                "upper": "linen shirt, wool doublet with modest padding",
                "lower": "wool breeches, leather boots or shoes",
                "headwear": "flat cap or no hat for common men, morion helmet for soldiers",
                "accessories": "leather belt, simple cross pendant"
            },
            "spanish_female": {
                "dress": "long wool or linen gown, high collar, modest neckline",
                "headwear": "mantilla (lace head covering), simple coif",
                "accessories": "rosary beads, simple jewelry"
            },
            "spanish_boy_13": {
                "upper": "simple linen shirt, plain doublet or jerkin",
                "lower": "wool breeches reaching to knee, leather shoes",
                "headwear": "flat cap or bare head",
                "notes": "simpler version of adult male clothing"
            },
            "spanish_soldier": {
                "armor": "morion helmet, steel breastplate and backplate",
                "clothing": "padded jack under armor, linen shirt",
                "weapons": "pike, matchlock musket, rapier or cutlass",
                "accessories": "powder horn, leather bandolier"
            },
            "timucua_indigenous": {
                "male": "deerskin breechcloth, body paint, shell jewelry, long hair",
                "female": "moss or deerskin skirt, shell necklaces, tattooed",
                "children": "minimal clothing, similar materials",
                "notes": "NO feather headdresses (Plains tribes), NO war paint patterns from wrong tribes"
            }
        },

        "architecture": {
            "spanish_settlement": [
                "wooden palisade fortification walls",
                "timber frame buildings with thatch roofs",
                "coquina stone (only in later St. Augustine)",
                "simple wooden church with cross",
                "packed earth streets"
            ],
            "timucua_village": [
                "circular houses with palm thatch",
                "communal buildings on raised platforms",
                "cooking fires with tripod structures",
                "palisade walls for protection"
            ]
        },

        "props": {
            "tools": ["iron axe", "wooden hoe", "fishing net", "rope"],
            "weapons": ["matchlock musket", "pike", "rapier", "crossbow"],
            "religious": ["wooden crucifix", "rosary beads", "Catholic icons"],
            "maritime": ["wooden sailing ship (galleon)", "rowboat", "fishing equipment"],
            "food": ["dried corn", "fish", "pottery vessels", "wooden bowls"],
            "lighting": ["tallow candles", "oil lamps (no glass chimney)", "torches", "campfire"]
        },

        "lighting_rules": {
            "allowed": ["natural sunlight", "candles", "oil lamps", "torches", "campfire"],
            "forbidden": ["glass lanterns with metal frames", "any electric light"]
        },

        "color_palette": [
            "earth tones: brown, tan, ochre",
            "natural greens from vegetation",
            "white/cream linen",
            "deep red and black for Spanish clothing",
            "muted blues from natural dyes"
        ],

        "avoid": [
            "English colonial style buildings",
            "brick construction",
            "log cabins (Swedish, introduced 1638)",
            "Plains Indian feather headdresses",
            "Cherokee or Iroquois cultural elements",
            "flintlock muskets (use matchlock)",
            "elaborate sword hilts",
            "glass windows",
            "printed fabrics"
        ]
    },

    # =========================================================================
    # ERA 2: EARLY ENGLISH SETTLEMENT (1607-1630)
    # Lessons: 2, 3, 4
    # =========================================================================
    "early_english": {
        "years": (1607, 1630),
        "name": "Early English Settlement",
        "lessons": [2, 3, 4],

        "clothing": {
            "english_gentleman": {
                "upper": "padded doublet with slashed sleeves, starched ruff collar",
                "lower": "paned trunk hose or Venetians, silk stockings",
                "headwear": "tall felt hat with feather",
                "accessories": "rapier, leather gloves, gold chain"
            },
            "indentured_servant_male": {
                "upper": "plain linen shirt, wool jerkin or plain doublet",
                "lower": "wool breeches, woolen stockings, leather shoes",
                "headwear": "flat cap or Monmouth cap",
                "accessories": "leather apron if working, no ruff"
            },
            "pilgrim_male": {
                "upper": "wool doublet in brown/green/red (NOT all black), white linen collar",
                "lower": "wool breeches to knee, woolen stockings",
                "headwear": "felt capotain hat (tall crowned)",
                "notes": "Pilgrims wore colors, not just black"
            },
            "pilgrim_female": {
                "dress": "wool bodice and skirt in muted colors, white linen coif",
                "outer": "wool cloak or cape",
                "apron": "white linen apron",
                "notes": "modest but not all black"
            },
            "pilgrim_child": {
                "clothing": "miniature versions of adult clothing",
                "boys": "gowns until age 6-7, then breeched",
                "girls": "similar to mothers but simpler"
            },
            "powhatan_indigenous": {
                "male": "deerskin mantle, breechcloth, moccasins, body paint",
                "female": "deerskin dress or skirt, shell jewelry",
                "chief": "elaborate feather mantle, copper gorget",
                "notes": "specific to Virginia Algonquian peoples"
            },
            "wampanoag_indigenous": {
                "male": "deerskin clothing, wampum belts, copper ornaments",
                "female": "deerskin dress, shell beadwork",
                "notes": "specific to Massachusetts/Plymouth area"
            }
        },

        "architecture": {
            "jamestown": [
                "wooden palisade triangular fort",
                "wattle-and-daub houses with thatch roofs",
                "crude wooden church",
                "storehouse",
                "muddy streets"
            ],
            "plymouth": [
                "timber-frame houses with steep thatch roofs",
                "central stone chimneys",
                "small windows (glass is expensive)",
                "dirt streets",
                "wooden fencing"
            ]
        },

        "props": {
            "weapons": ["matchlock musket (transitioning to flintlock by 1630)", "sword", "pike"],
            "tools": ["iron tools", "wooden farming implements", "spinning wheel"],
            "household": ["wooden trenchers", "pewter plates (wealthy)", "iron pots"],
            "writing": ["quill pen", "hand-bound book", "ink pot"],
            "maritime": ["small sailing ships", "shallops", "canoes"],
            "lighting": ["tallow candles", "rushlights", "fireplace"]
        },

        "avoid": [
            "log cabins (Swedish, 1638)",
            "buckle shoes (myth - Pilgrims wore plain leather)",
            "all-black Pilgrim clothing",
            "Thanksgiving turkey as central imagery",
            "flintlock muskets before 1630",
            "brick buildings",
            "paned glass windows for common folk"
        ]
    },

    # =========================================================================
    # ERA 3: COLONIAL EXPANSION (1630-1700)
    # Lessons: 5, 6, 7
    # =========================================================================
    "colonial_expansion": {
        "years": (1630, 1700),
        "name": "Colonial Expansion",
        "lessons": [5, 6, 7],

        "clothing": {
            "dutch_merchant": {
                "upper": "wide lace collar, fitted jacket, linen shirt",
                "lower": "full breeches to knee, white stockings",
                "headwear": "wide-brimmed felt hat",
                "accessories": "gold chain, walking stick"
            },
            "quaker_male": {
                "upper": "plain gray or brown coat with hooks (no buttons)",
                "lower": "plain breeches, dark stockings",
                "headwear": "broad-brimmed hat (never removed)",
                "notes": "deliberately plain, no ornamentation"
            },
            "quaker_female": {
                "dress": "plain gray or brown dress, white cap",
                "accessories": "no jewelry, no bright colors",
                "notes": "modest, simple, unadorned"
            },
            "plantation_owner": {
                "upper": "long wig (beginning), lace cuffs, embroidered waistcoat",
                "lower": "knee breeches, silk stockings",
                "style": "Cavalier influence, ostentatious"
            },
            "yeoman_farmer": {
                "upper": "linen shirt, leather jerkin",
                "lower": "leather or wool breeches",
                "headwear": "straw hat for field work"
            },
            "enslaved_african": {
                "clothing": "coarse osnaburg cloth shirt and breeches",
                "footwear": "often barefoot or simple moccasins",
                "headwear": "head wrap for women",
                "notes": "minimal, provided by owner"
            },
            "ship_captain": {
                "upper": "blue coat with brass buttons, tricorn hat beginning",
                "lower": "knee breeches, buckled shoes"
            },
            "sailor": {
                "upper": "loose shirt, sometimes striped",
                "lower": "loose trousers or petticoat breeches",
                "footwear": "bare feet or soft shoes"
            }
        },

        "architecture": {
            "dutch_colonial": [
                "stepped gable brick houses",
                "tile roofs",
                "Dutch doors",
                "canal-side buildings"
            ],
            "southern_plantation": [
                "Georgian style beginning (symmetry, central hall)",
                "tobacco barns and curing sheds",
                "slave quarters",
                "brick main house (wealthy)"
            ],
            "new_england": [
                "saltbox houses",
                "clapboard siding",
                "central chimney",
                "small windows"
            ]
        },

        "props": {
            "weapons": ["flintlock musket (replacing matchlock by 1650)", "sword"],
            "trade": ["tobacco hogshead barrels", "rum barrels", "molasses", "textiles"],
            "smoking": ["clay pipe", "tobacco leaves"],
            "household": ["spinning wheel", "butter churn", "iron cookware"],
            "maritime": ["larger sailing ships", "trade cargo"],
            "lighting": ["candles", "oil lamps", "fireplace"]
        },

        "avoid": [
            "Georgian mansions in early period (develop by 1700s)",
            "Franklin stove (1741)",
            "spectacles with modern frames",
            "mass-produced goods"
        ]
    },

    # =========================================================================
    # ERA 4: COLONIAL RELIGIOUS & MILITARY (1730-1763)
    # Lessons: 8, 9, 10
    # =========================================================================
    "colonial_military": {
        "years": (1730, 1763),
        "name": "Colonial Religious and Military Era",
        "lessons": [8, 9, 10],

        "clothing": {
            "revival_preacher": {
                "clothing": "black robe or plain dark suit, white bands at throat",
                "style": "simple, focused on message not appearance"
            },
            "british_regular": {
                "coat": "red wool coat with regimental facings",
                "equipment": "white leather crossbelts, cartridge box",
                "headwear": "tricorn hat or grenadier bearskin",
                "weapon": "Brown Bess musket, bayonet"
            },
            "colonial_militia": {
                "clothing": "mix of civilian clothes and military items",
                "common": "hunting shirt, tricorn hat, powder horn",
                "weapon": "fowling piece or rifle"
            },
            "french_soldier": {
                "coat": "white or gray coat with blue facings",
                "headwear": "tricorn hat",
                "weapon": "Charleville musket"
            },
            "native_warrior_1750s": {
                "traditional": "tribal-specific dress, body paint",
                "trade_goods": "European cloth, metal tomahawk, trade beads",
                "hair": "shaved head with scalp lock (some tribes)"
            },
            "urban_gentry_1760s": {
                "male": "full Georgian style, powdered wig, brocade waistcoat, silk stockings",
                "female": "sacque-back gown or robe a la francaise"
            },
            "craftsman": {
                "clothing": "leather apron, rolled sleeves, practical clothing",
                "tools": "trade-specific tools visible"
            }
        },

        "architecture": {
            "church": [
                "white clapboard exterior",
                "tall steeple with bell",
                "clear glass windows",
                "simple interior with box pews"
            ],
            "military_fort": [
                "log palisade walls",
                "corner bastions",
                "wooden blockhouse"
            ],
            "urban_1760s": [
                "brick townhouses",
                "cobblestone streets",
                "Georgian symmetry"
            ]
        },

        "props": {
            "weapons": ["Brown Bess musket", "Charleville musket", "powder horn", "tomahawk"],
            "military": ["cartridge box", "canteen", "knapsack", "drum"],
            "religious": ["Bible", "hymnal", "outdoor pulpit"],
            "urban": ["printing press", "tea set (Chinese porcelain)", "carriage"],
            "lighting": ["candles", "oil lamps", "whale oil"]
        },

        "avoid": [
            "rifles in large numbers (common by 1776, rare before)",
            "American flags (none exist yet)",
            "Independence-era imagery",
            "modern military uniforms"
        ]
    },

    # =========================================================================
    # ERA 5: REVOLUTIONARY PERIOD (1765-1783)
    # Lessons: 11, 12, 13, 14, 15, 16, 17
    # =========================================================================
    "revolutionary": {
        "years": (1765, 1783),
        "name": "Revolutionary Period",
        "lessons": [11, 12, 13, 14, 15, 16, 17],

        "clothing": {
            "patriot_civilian": {
                "fabric": "homespun cloth (boycott of British goods)",
                "headwear": "liberty cap or tricorn",
                "accessories": "cockade ribbon"
            },
            "sons_of_liberty": {
                "clothing": "working-class attire, leather apron",
                "imagery": "tar and feathers, Liberty Tree"
            },
            "continental_army_early": {
                "clothing": "mix of civilian clothes, hunting shirts, varied",
                "headwear": "tricorn hats, some round hats",
                "notes": "no uniform consistency early on"
            },
            "continental_army_late": {
                "coat": "blue coat with state-specific facings (after French aid)",
                "equipment": "French-supplied items"
            },
            "british_soldier_1770s": {
                "coat": "red coat with regimental facings",
                "headwear": "bearskin (grenadiers), tricorn (line)",
                "equipment": "crossbelts, Brown Bess"
            },
            "valley_forge": {
                "condition": "ragged uniforms, blanket coats",
                "footwear": "bloody footprints in snow",
                "shelter": "log huts, crude construction",
                "state": "thin, starving, but determined"
            },
            "french_ally": {
                "coat": "white uniform with blue facings",
                "style": "more elaborate than American"
            },
            "black_soldier": {
                "clothing": "mixed - some in Continental uniform, some civilian",
                "notes": "served on both sides"
            }
        },

        "architecture": {
            "boston": [
                "Georgian brick townhouses",
                "cobblestone streets",
                "Long Wharf",
                "church steeples"
            ],
            "philadelphia": [
                "brick row houses",
                "Independence Hall style",
                "wider streets"
            ],
            "military_camp": [
                "log huts (Valley Forge)",
                "tent cities",
                "earthworks and trenches"
            ]
        },

        "props": {
            "weapons": ["Brown Bess", "Charleville (French aid)", "Pennsylvania rifle"],
            "military": ["drums", "fifes", "regimental colors"],
            "protest": ["Liberty Tree", "tea chests", "tarred dummy"],
            "documents": ["newspapers", "pamphlets (Common Sense)"],
            "lighting": ["candles", "lanterns", "campfire"]
        },

        "avoid": [
            "Betsy Ross flag before 1777 (and even then uncertain)",
            "electric lighting",
            "metallic industrial elements",
            "modern American flag (wrong star count)",
            "photography"
        ]
    },

    # =========================================================================
    # ERA 6: EARLY REPUBLIC (1787-1800)
    # Lessons: 18, 19, 20, 21
    # =========================================================================
    "early_republic": {
        "years": (1787, 1800),
        "name": "Early Republic",
        "lessons": [18, 19, 20, 21],

        "clothing": {
            "founding_father": {
                "formal": "powdered wig, silk stockings, buckled shoes, long coat",
                "notes": "formal 18th-century gentleman"
            },
            "washington": {
                "military": "Continental Army uniform",
                "civilian": "dark suit, no crown imagery"
            },
            "common_citizen": {
                "clothing": "simpler versions of elite fashion",
                "notes": "less powder, less wigs"
            },
            "1790s_fashion": {
                "male": "transition to natural hair, high collars, cravats",
                "female": "empire waist beginning, mob caps, fichus"
            }
        },

        "architecture": {
            "federal_style": [
                "columns and classical elements",
                "domes on government buildings",
                "symmetrical design"
            ],
            "urban": [
                "brick townhouses",
                "fanlights over doors"
            ]
        },

        "props": {
            "writing": ["quill pens", "inkwells", "sealing wax", "parchment"],
            "transportation": ["carriages (phaetons, coaches)"],
            "politics": ["early banking instruments", "hand-set newspapers"],
            "lighting": ["candles", "oil lamps"]
        },

        "avoid": [
            "Eagles as national symbol before 1782",
            "modern U.S. Capitol dome (current dome from 1860s)",
            "gas lighting (invented 1792, not widespread)",
            "photography"
        ]
    },

    # =========================================================================
    # ERA 7: JEFFERSONIAN EXPANSION (1803-1815)
    # Lessons: 22, 23, 24
    # =========================================================================
    "jeffersonian": {
        "years": (1803, 1815),
        "name": "Jeffersonian Expansion",
        "lessons": [22, 23, 24],

        "clothing": {
            "new_orleans_french": {
                "style": "Creole fashion, lighter fabrics for climate",
                "influence": "French Caribbean style"
            },
            "corps_of_discovery": {
                "uniform": "military uniforms, worn and adapted",
                "frontier": "buckskin additions, practical gear"
            },
            "sacagawea": {
                "dress": "Shoshone dress, practical frontier wear",
                "baby": "cradleboard for baby"
            },
            "plains_tribes": {
                "notes": "specific tribal dress - Mandan, Sioux, Nez Perce have distinct styles",
                "avoid": "generic 'Indian' imagery"
            },
            "war_1812_us": {
                "coat": "blue coat with red facings",
                "headwear": "shakos replacing tricorns"
            },
            "war_1812_british": {
                "coat": "red coat",
                "headwear": "stovepipe shakos"
            }
        },

        "architecture": {
            "new_orleans": [
                "French Quarter style",
                "wrought iron balconies",
                "courtyards"
            ],
            "frontier": [
                "log structures",
                "trading posts",
                "wilderness"
            ]
        },

        "props": {
            "expedition": ["keelboats", "pirogues", "compasses", "sextants", "journals"],
            "trade": ["blankets", "beads", "metal tools"],
            "lighting": ["candles", "oil lamps", "campfire"]
        },

        "avoid": [
            "steamboats before 1807 (Fulton's Clermont)",
            "Conestoga wagons (Oregon Trail era imagery)",
            "photography equipment",
            "railroad"
        ]
    },

    # =========================================================================
    # ERA 8: JACKSONIAN AMERICA (1823-1850)
    # Lessons: 25, 26, 27, 28, 29, 30
    # =========================================================================
    "jacksonian": {
        "years": (1823, 1850),
        "name": "Jacksonian America",
        "lessons": [25, 26, 27, 28, 29, 30],

        "clothing": {
            "politician_1820s": {
                "transition": "wigs to natural hair, high collars, cravats"
            },
            "common_man_1830s": {
                "style": "less formal dress, stovepipe hats, frontier influence",
                "boots": "practical boots"
            },
            "1830s_female": {
                "sleeves": "leg-of-mutton sleeves (very puffy)",
                "skirt": "fuller skirts",
                "headwear": "bonnets"
            },
            "cherokee_1838": {
                "men": "some in European-style suits (assimilation), others traditional",
                "women": "adapted dresses with traditional elements",
                "notes": "Cherokee had significantly adopted European dress"
            },
            "trail_of_tears": {
                "setting": "forced march, wagons, walking families",
                "condition": "winter conditions, suffering"
            },
            "us_soldier_1830s": {
                "coat": "blue with yellow cavalry facings",
                "headwear": "shako"
            },
            "reform_era": {
                "abolitionists": "Quaker influence, plain dress",
                "womens_rights": "practical dress, Bloomer beginnings (1851)"
            }
        },

        "architecture": {
            "plantation": [
                "Greek Revival style",
                "tall columns",
                "symmetrical design"
            ],
            "frontier": [
                "expanding log to frame houses"
            ]
        },

        "props": {
            "transportation": ["steam locomotives (1830s railroad expansion)", "wagons"],
            "industry": ["cotton gin imagery"],
            "media": ["political newspapers", "printing press"],
            "lighting": ["oil lamps", "candles"]
        },

        "avoid": [
            "daguerreotypes in hand before 1839",
            "telegraph wires before 1844",
            "covered wagons (more 1840s-1850s imagery)",
            "photography before 1839"
        ]
    },

    # =========================================================================
    # ERA 9: MANIFEST DESTINY (1840-1860)
    # Lessons: 31, 32, 33, 34, 35, 36, 37
    # =========================================================================
    "manifest_destiny": {
        "years": (1840, 1860),
        "name": "Manifest Destiny Era",
        "lessons": [31, 32, 33, 34, 35, 36, 37],

        "clothing": {
            "pioneer_male": {
                "upper": "wool trousers, cotton shirt",
                "headwear": "broad-brimmed hat",
                "practical": "for trail and farm work"
            },
            "pioneer_female": {
                "dress": "practical calico dresses",
                "headwear": "sunbonnets",
                "apron": "always present"
            },
            "1850s_male": {
                "formal": "frock coats, top hats",
                "facial_hair": "increasing beards and mustaches"
            },
            "1850s_female": {
                "skirt": "wide hoop skirts (crinoline)",
                "headwear": "elaborate bonnets"
            },
            "enslaved_1850s": {
                "clothing": "coarse clothing, no shoes often",
                "context": "work context"
            },
            "free_black": {
                "clothing": "modest but respectable dress",
                "variations": "Northern vs Southern differences"
            },
            "mexican_american_war": {
                "us_soldier": "blue uniforms, shakos, dragoon cavalry",
                "mexican_soldier": "green/blue uniforms, distinctive shakos"
            }
        },

        "architecture": {
            "plantation_peak": [
                "Greek Revival at peak",
                "slave quarters visible"
            ],
            "northern_industrial": [
                "brick factories",
                "tenements"
            ],
            "kansas_territory": [
                "sod houses",
                "log cabins",
                "raw settlements"
            ]
        },

        "props": {
            "weapons": ["Colt revolvers", "Sharps rifles (Beecher's Bibles)"],
            "trail": ["covered wagons (Conestoga)", "oxen", "campfire cooking"],
            "media": ["printing press", "Uncle Tom's Cabin book (1852)"],
            "transportation": ["railroad locomotives"]
        },

        "avoid": [
            "repeating rifles (Civil War era)",
            "photographs in color",
            "electric anything"
        ]
    },

    # =========================================================================
    # ERA 10: CIVIL WAR (1861-1865)
    # Lessons: 38, 39, 40
    # =========================================================================
    "civil_war": {
        "years": (1861, 1865),
        "name": "Civil War",
        "lessons": [38, 39, 40],

        "clothing": {
            "union_army": {
                "coat": "blue wool frock coat or sack coat",
                "headwear": "kepi or forage cap",
                "equipment": "leather accoutrements, cartridge box, cap box"
            },
            "confederate_army": {
                "coat": "gray (varied shades), butternut when gray unavailable",
                "equipment": "often mixed, captured Federal items"
            },
            "officers": {
                "uniform": "frock coats, swords, sashes",
                "distinctions": "shoulder straps, rank insignia"
            },
            "civilians_1860s": {
                "male": "frock coats, vests, top hats",
                "female": "hoop skirts, mourning dress increasingly common"
            },
            "lincoln": {
                "headwear": "tall stovepipe hat",
                "clothing": "black suit",
                "features": "beard (grown 1860)"
            },
            "grant_appomattox": {
                "appearance": "mud-spattered field uniform, plain"
            },
            "lee_appomattox": {
                "appearance": "gray uniform, sword"
            }
        },

        "architecture": {
            "military": [
                "entrenchments",
                "siege lines",
                "fortifications"
            ],
            "destruction": [
                "Richmond, Atlanta ruins"
            ],
            "fords_theatre": [
                "1860s theatre interior",
                "box seats"
            ]
        },

        "props": {
            "weapons": ["Springfield rifle", "Enfield rifle", "Napoleon cannon", "Parrott rifle"],
            "military": ["drums", "flags (correct patterns)", "telegraphs"],
            "medical": ["crude surgery", "bandages", "ambulances"],
            "photography": ["Matthew Brady era - but images are B&W"]
        },

        "avoid": [
            "machine guns (Gatling existed but very rare)",
            "modern surgical equipment",
            "color photographs",
            "wrong flag patterns"
        ]
    },

    # =========================================================================
    # ERA 11: RECONSTRUCTION (1865-1877)
    # Lessons: 41, 42, 43
    # =========================================================================
    "reconstruction": {
        "years": (1865, 1877),
        "name": "Reconstruction",
        "lessons": [41, 42, 43],

        "clothing": {
            "freedmen": {
                "transition": "from slave clothing to self-purchased",
                "sunday_best": "suits for church, dignity emphasized"
            },
            "freedwomen": {
                "dress": "simple dresses, head wraps common",
                "sunday": "best clothing for church"
            },
            "black_politicians": {
                "clothing": "formal suits, dignity emphasized",
                "notes": "professional appearance"
            },
            "freedmens_bureau": {
                "officials": "Northern officials in suits"
            },
            "carpetbaggers": {
                "clothing": "business suits",
                "props": "distinctive carpetbag luggage"
            }
        },

        "architecture": {
            "freedmens_schools": [
                "simple frame buildings"
            ],
            "southern_towns": [
                "rebuilding",
                "some ruins"
            ],
            "black_churches": [
                "simple frame structures",
                "central to community"
            ]
        },

        "props": {
            "education": ["schoolbooks", "chalkboards", "slates"],
            "farming": ["farming implements", "sharecropping context"],
            "politics": ["voting ballots (paper)", "campaign materials"],
            "transportation": ["railroad expansion"]
        },

        "avoid": [
            "modern civil rights imagery",
            "unrealistic integration",
            "romanticized plantation imagery"
        ]
    },

    # =========================================================================
    # ERA 12: GILDED AGE (1870-1900)
    # Lessons: 44, 45, 46, 47
    # =========================================================================
    "gilded_age": {
        "years": (1870, 1900),
        "name": "Gilded Age",
        "lessons": [44, 45, 46, 47],

        "clothing": {
            "industrialist": {
                "formal": "top hats, long coats, gold watch chains",
                "wealth": "obvious displays"
            },
            "factory_worker": {
                "clothing": "work clothes, aprons",
                "children": "child labor - small work clothes"
            },
            "immigrant_ellis_island": {
                "variety": "European peasant dress, bundles",
                "italian": "Southern Italian folk dress transitioning",
                "eastern_european": "traditional clothing, head coverings",
                "chinese": "queue hairstyle (men), traditional dress"
            },
            "union_worker": {
                "clothing": "work clothes, union buttons/badges"
            },
            "farmer_1890s": {
                "male": "overalls becoming common, straw hats",
                "female": "practical calico, aprons, bonnets"
            }
        },

        "architecture": {
            "industrial": [
                "factories with smokestacks",
                "tenements"
            ],
            "wealthy": [
                "Victorian mansions",
                "ornate details"
            ],
            "rural": [
                "farmhouses",
                "barns",
                "windmills (Plains)"
            ]
        },

        "props": {
            "industrial": ["steam engines", "factory machinery"],
            "technology": ["electric lighting (late period)", "telephones (1876)", "typewriters (1870s)"],
            "immigration": ["bundles", "trunks", "documents"]
        },

        "avoid": [
            "automobiles (rare until 1900s)",
            "radio equipment",
            "modern industrial safety equipment"
        ]
    },

    # =========================================================================
    # ERA 13: PROGRESSIVE ERA (1900-1920)
    # Lessons: 48, 49, 50, 51
    # =========================================================================
    "progressive": {
        "years": (1900, 1920),
        "name": "Progressive Era",
        "lessons": [48, 49, 50, 51],

        "clothing": {
            "settlement_worker": {
                "style": "simple professional dress, practical"
            },
            "suffragist": {
                "dress": "white dresses (symbolism), sashes, banners"
            },
            "working_woman": {
                "clothing": "shirtwaists, long skirts"
            },
            "1910s_fashion": {
                "female": "hobble skirts, elaborate hats"
            },
            "doughboy_wwi": {
                "uniform": "olive drab, campaign hats, puttees",
                "equipment": "Sam Browne belts (officers)"
            },
            "theodore_roosevelt": {
                "accessories": "pince-nez glasses",
                "build": "robust physique",
                "military": "Rough Rider imagery"
            }
        },

        "architecture": {
            "urban": [
                "steel-frame buildings",
                "department stores"
            ],
            "settlement_houses": [
                "urban neighborhood settings"
            ],
            "wwi_trenches": [
                "Western Front trenches",
                "shell craters",
                "mud"
            ]
        },

        "props": {
            "transportation": ["automobiles (Model T 1908)", "airplanes (Wright Brothers 1903)"],
            "wwi": ["machine guns", "gas masks", "barbed wire"],
            "technology": ["telephones (desk models)", "early motion pictures"],
            "suffrage": ["banners", "sashes", "picket signs"]
        },

        "avoid": [
            "modern WWI movie aesthetic (too clean)",
            "post-1920 fashion (flapper era)",
            "television",
            "radio broadcasting (1920)"
        ]
    }
}


def get_era_for_year(year: int) -> str:
    """
    Determine which era a given year belongs to.

    Args:
        year: The year to look up

    Returns:
        Era key string
    """
    era_ranges = [
        ((1565, 1606), "spanish_colonial"),
        ((1607, 1629), "early_english"),
        ((1630, 1729), "colonial_expansion"),
        ((1730, 1764), "colonial_military"),
        ((1765, 1786), "revolutionary"),
        ((1787, 1802), "early_republic"),
        ((1803, 1822), "jeffersonian"),
        ((1823, 1839), "jacksonian"),
        ((1840, 1860), "manifest_destiny"),
        ((1861, 1865), "civil_war"),
        ((1866, 1869), "reconstruction"),
        ((1870, 1899), "gilded_age"),
        ((1900, 1920), "progressive"),
    ]

    for (start, end), era_key in era_ranges:
        if start <= year <= end:
            return era_key

    return "unknown"


def get_era_guidelines(year: int) -> dict:
    """
    Get the full era guidelines for a given year.

    Args:
        year: The year to look up

    Returns:
        Dictionary of era guidelines
    """
    era_key = get_era_for_year(year)
    return ERA_GUIDELINES.get(era_key, {})


def get_avoid_list(year: int) -> list:
    """
    Get the list of things to avoid for a given year.

    Args:
        year: The year to look up

    Returns:
        List of things to avoid in images
    """
    guidelines = get_era_guidelines(year)
    return guidelines.get("avoid", [])


def get_clothing_for_character(year: int, gender: str, age: int, ethnicity: str, role: str = None) -> dict:
    """
    Get appropriate clothing description for a character.

    Args:
        year: The year
        gender: "male" or "female"
        age: Character's age
        ethnicity: Character's ethnicity
        role: Optional specific role (e.g., "soldier", "farmer")

    Returns:
        Dictionary with clothing descriptions
    """
    guidelines = get_era_guidelines(year)
    clothing = guidelines.get("clothing", {})

    # Build search keys based on character attributes
    search_keys = []

    # Add role-specific keys
    if role:
        search_keys.append(role.lower().replace(" ", "_"))

    # Add ethnicity-specific keys
    if ethnicity:
        eth_key = ethnicity.lower().replace(" ", "_").replace("-", "_")
        search_keys.append(f"{eth_key}_{gender}")
        search_keys.append(eth_key)

    # Add age-based keys
    if age <= 15:
        search_keys.append(f"child")
        search_keys.append(f"young_{gender}")

    # Add generic gender keys
    search_keys.append(f"{gender}")
    search_keys.append(f"common_citizen")

    # Search for matching clothing
    for key in search_keys:
        for clothing_key, clothing_data in clothing.items():
            if key in clothing_key.lower():
                return clothing_data

    return {}


def get_architecture_for_location(year: int, location: str) -> list:
    """
    Get appropriate architecture descriptions for a location.

    Args:
        year: The year
        location: The location string

    Returns:
        List of architecture descriptions
    """
    guidelines = get_era_guidelines(year)
    architecture = guidelines.get("architecture", {})

    location_lower = location.lower()

    # Map locations to architecture types
    location_mappings = {
        "boston": ["urban", "new_england"],
        "philadelphia": ["urban", "philadelphia"],
        "new york": ["urban", "dutch"],
        "virginia": ["southern", "plantation"],
        "jamestown": ["jamestown"],
        "plymouth": ["plymouth", "new_england"],
        "st. augustine": ["spanish"],
        "florida": ["spanish"],
        "frontier": ["frontier"],
        "oregon": ["frontier"],
        "kansas": ["kansas", "frontier"],
        "gettysburg": ["military", "destruction"],
        "new orleans": ["new_orleans"],
        "chicago": ["urban", "industrial"],
        "france": ["wwi_trenches"]
    }

    # Find matching architecture
    for loc_key, arch_keys in location_mappings.items():
        if loc_key in location_lower:
            for arch_key in arch_keys:
                if arch_key in architecture:
                    return architecture[arch_key]

    # Return first available if no match
    if architecture:
        return list(architecture.values())[0]

    return []


def get_props_for_context(year: int, context: str = None) -> dict:
    """
    Get appropriate props for a given year and context.

    Args:
        year: The year
        context: Optional context (e.g., "military", "domestic")

    Returns:
        Dictionary of props by category
    """
    guidelines = get_era_guidelines(year)
    return guidelines.get("props", {})


def get_lighting_rules(year: int) -> dict:
    """
    Get lighting rules for a given year.

    Args:
        year: The year

    Returns:
        Dictionary with allowed and forbidden lighting
    """
    guidelines = get_era_guidelines(year)

    # Default lighting rules based on year
    if year < 1816:
        return {
            "allowed": ["natural sunlight", "candles", "oil lamps", "torches", "fireplace", "campfire"],
            "forbidden": ["gas lighting", "electric lighting"]
        }
    elif year < 1880:
        return {
            "allowed": ["natural sunlight", "candles", "oil lamps", "gas lighting", "kerosene lamps"],
            "forbidden": ["electric lighting"]
        }
    else:
        return {
            "allowed": ["natural sunlight", "candles", "oil lamps", "gas lighting", "electric lighting (urban)"],
            "forbidden": ["modern fluorescent", "LED lighting"]
        }


# Universal anachronisms that should never appear
UNIVERSAL_AVOID = [
    "wristwatches",
    "plastic",
    "zippers",
    "modern sunglasses",
    "synthetic fabrics",
    "nylon",
    "polyester",
    "sneakers",
    "modern eyeglasses frames",
    "digital displays",
    "concrete (before 1870s)",
    "aluminum (before 1886)",
    "stainless steel",
    "chrome",
    "neon lights"
]


def get_full_avoid_list(year: int) -> list:
    """
    Get complete avoid list including universal and era-specific items.

    Args:
        year: The year

    Returns:
        Complete list of things to avoid
    """
    era_avoid = get_avoid_list(year)
    lighting_rules = get_lighting_rules(year)

    full_list = UNIVERSAL_AVOID.copy()
    full_list.extend(era_avoid)
    full_list.extend(lighting_rules.get("forbidden", []))

    return list(set(full_list))  # Remove duplicates


if __name__ == "__main__":
    # Test the module
    print("Testing era_guidelines.py")
    print("=" * 50)

    test_years = [1565, 1620, 1720, 1776, 1820, 1863, 1890, 1918]

    for year in test_years:
        era = get_era_for_year(year)
        guidelines = get_era_guidelines(year)
        avoid = get_avoid_list(year)

        print(f"\nYear {year}: {era}")
        print(f"  Era Name: {guidelines.get('name', 'Unknown')}")
        print(f"  Avoid list items: {len(avoid)}")
