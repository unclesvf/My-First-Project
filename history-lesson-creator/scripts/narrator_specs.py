"""
Narrator Specifications for Historical Image Generation
========================================================
This module provides detailed narrator information for each of the 51 history lessons.
Used to ensure generated images accurately represent the narrator character.

Usage:
    from narrator_specs import get_narrator, NARRATORS

    narrator = get_narrator(1)  # Returns Mateo's information for Lesson 1
"""

NARRATORS = {
    # =========================================================================
    # LESSONS 1-10: Colonial Era
    # =========================================================================
    1: {
        "name": "Mateo",
        "age": 13,
        "gender": "male",
        "ethnicity": "Spanish",
        "year": 1565,
        "location": "St. Augustine, Florida",
        "role": "Spanish settler, son of a colonist",
        "physical_description": "13-year-old Spanish boy with dark hair and olive skin",
        "clothing_class": "common",
        "emotion_profile": ["wonder", "fear", "curiosity", "growing maturity"],
        "key_scenes": [
            "arriving by ship at Florida coast",
            "helping build wooden fortifications",
            "meeting Timucua boy Ahone by river",
            "watching Spanish-Timucua interactions",
            "reflecting on settlement's growth"
        ]
    },

    2: {
        "name": "Samuel",
        "age": 14,
        "gender": "male",
        "ethnicity": "English",
        "year": 1609,
        "location": "Jamestown, Virginia",
        "role": "Indentured servant",
        "physical_description": "14-year-old English boy, thin and hardened by labor",
        "clothing_class": "servant",
        "emotion_profile": ["determination", "suffering", "hope", "resilience"],
        "key_scenes": [
            "arriving at Jamestown fort",
            "surviving the Starving Time",
            "working in tobacco fields",
            "witnessing House of Burgesses",
            "earning freedom as young man"
        ]
    },

    3: {
        "name": "Elizabeth",
        "age": 12,
        "gender": "female",
        "ethnicity": "English (Pilgrim)",
        "year": 1620,
        "location": "Plymouth, Massachusetts",
        "role": "Pilgrim child aboard the Mayflower",
        "physical_description": "12-year-old English Pilgrim girl with fair skin, wearing modest Pilgrim dress",
        "clothing_class": "middling Pilgrim",
        "emotion_profile": ["faith", "wonder", "fear", "hope"],
        "key_scenes": [
            "aboard the Mayflower during crossing",
            "men signing Mayflower Compact",
            "surviving first brutal winter",
            "meeting Squanto and Wampanoag",
            "first Thanksgiving feast"
        ]
    },

    4: {
        "name": "John",
        "age": 13,
        "gender": "male",
        "ethnicity": "English (Puritan)",
        "year": 1630,
        "location": "Boston, Massachusetts",
        "role": "Son of a Puritan minister",
        "physical_description": "13-year-old Puritan boy with serious expression, neat but plain clothing",
        "clothing_class": "minister's family",
        "emotion_profile": ["piety", "questioning", "internal conflict"],
        "key_scenes": [
            "arriving at Massachusetts Bay",
            "attending Puritan church service",
            "studying scripture",
            "witnessing community discipline",
            "contemplating faith and doubt"
        ]
    },

    5: {
        "name": "Maria",
        "age": 14,
        "gender": "female",
        "ethnicity": "Dutch",
        "year": 1680,
        "location": "New York",
        "role": "Daughter of a Dutch merchant",
        "physical_description": "14-year-old Dutch girl with light brown hair, dressed in Dutch colonial style",
        "clothing_class": "merchant family",
        "emotion_profile": ["curiosity", "openness", "pride in diversity"],
        "key_scenes": [
            "New York street with diverse people",
            "Dutch colonial home interior",
            "market scene with various ethnicities",
            "learning about religious tolerance",
            "celebrating cultural heritage"
        ]
    },

    6: {
        "name": "Thomas",
        "age": 14,
        "gender": "male",
        "ethnicity": "English Colonial",
        "year": 1690,
        "location": "Virginia",
        "role": "Son of a small tobacco farmer",
        "physical_description": "14-year-old Virginia farm boy, sun-weathered, practical clothing",
        "clothing_class": "yeoman farmer",
        "emotion_profile": ["hard work", "observation", "moral questioning"],
        "key_scenes": [
            "working in tobacco fields",
            "observing enslaved workers",
            "rural Virginia farmhouse",
            "tobacco curing barn",
            "questioning slavery's morality"
        ]
    },

    7: {
        "name": "James",
        "age": 15,
        "gender": "male",
        "ethnicity": "English Colonial",
        "year": 1720,
        "location": "Boston, Massachusetts",
        "role": "Son of a merchant ship captain",
        "physical_description": "15-year-old Boston merchant's son, well-dressed for the era",
        "clothing_class": "merchant family",
        "emotion_profile": ["growing moral awareness", "conflict", "privilege guilt"],
        "key_scenes": [
            "Boston harbor with trading ships",
            "learning about triangular trade",
            "seeing goods from slave trade",
            "father's merchant activities",
            "grappling with trade's morality"
        ]
    },

    8: {
        "name": "Sarah",
        "age": 14,
        "gender": "female",
        "ethnicity": "English Colonial",
        "year": 1741,
        "location": "Connecticut",
        "role": "Farmer's daughter",
        "physical_description": "14-year-old Connecticut farm girl, modest New England dress",
        "clothing_class": "farmer's family",
        "emotion_profile": ["religious fervor", "questioning", "personal awakening"],
        "key_scenes": [
            "attending outdoor revival meeting",
            "listening to fiery preacher",
            "emotional religious experience",
            "discussing faith with family",
            "personal spiritual awakening"
        ]
    },

    9: {
        "name": "Benjamin",
        "age": 16,
        "gender": "male",
        "ethnicity": "English Colonial",
        "year": 1755,
        "location": "Virginia frontier",
        "role": "Colonial militiaman",
        "physical_description": "16-year-old Virginia militiaman, mix of military and civilian dress",
        "clothing_class": "militia",
        "emotion_profile": ["courage", "fear", "patriotism", "coming of age"],
        "key_scenes": [
            "frontier fort or camp",
            "alongside British regulars",
            "wilderness march",
            "encountering Native warriors",
            "battle aftermath and reflection"
        ]
    },

    10: {
        "name": "Rachel",
        "age": 15,
        "gender": "female",
        "ethnicity": "English Colonial",
        "year": 1763,
        "location": "Philadelphia, Pennsylvania",
        "role": "Daughter of a printer",
        "physical_description": "15-year-old Philadelphia printer's daughter, educated appearance",
        "clothing_class": "craftsman family",
        "emotion_profile": ["curiosity", "awareness of change", "anticipation"],
        "key_scenes": [
            "Philadelphia street scene",
            "father's print shop",
            "reading newspapers",
            "colonial city life",
            "sensing coming changes"
        ]
    },

    # =========================================================================
    # LESSONS 11-20: Revolutionary Era
    # =========================================================================
    11: {
        "name": "William",
        "age": 16,
        "gender": "male",
        "ethnicity": "English Colonial",
        "year": 1765,
        "location": "Boston, Massachusetts",
        "role": "Apprentice to a Boston printer",
        "physical_description": "16-year-old Boston printer's apprentice, working-class appearance",
        "clothing_class": "apprentice",
        "emotion_profile": ["anger", "righteous indignation", "revolutionary spirit"],
        "key_scenes": [
            "printing protest materials",
            "Stamp Act protests",
            "Sons of Liberty meetings",
            "Boston street demonstrations",
            "growing revolutionary sentiment"
        ]
    },

    12: {
        "name": "Abigail",
        "age": 14,
        "gender": "female",
        "ethnicity": "English Colonial",
        "year": 1770,
        "location": "Boston, Massachusetts",
        "role": "Daughter of a Boston shopkeeper",
        "physical_description": "14-year-old Boston shopkeeper's daughter, middle-class dress",
        "clothing_class": "shopkeeper family",
        "emotion_profile": ["fear", "shock", "growing political awareness"],
        "key_scenes": [
            "Boston street with tension",
            "witnessing aftermath of Massacre",
            "comforting frightened family",
            "hearing accounts of shooting",
            "processing traumatic events"
        ]
    },

    13: {
        "name": "Thomas",
        "age": 15,
        "gender": "male",
        "ethnicity": "English Colonial",
        "year": 1773,
        "location": "Boston, Massachusetts",
        "role": "Apprentice to a Boston carpenter",
        "physical_description": "15-year-old carpenter's apprentice, working-class clothing",
        "clothing_class": "apprentice",
        "emotion_profile": ["excitement", "defiance", "pride in action"],
        "key_scenes": [
            "Boston harbor at night",
            "Tea Party preparations",
            "disguised as Mohawk",
            "dumping tea into harbor",
            "aftermath celebration"
        ]
    },

    14: {
        "name": "Nathan",
        "age": 17,
        "gender": "male",
        "ethnicity": "English Colonial",
        "year": 1775,
        "location": "Concord, Massachusetts",
        "role": "Minuteman",
        "physical_description": "17-year-old Minuteman, civilian clothes with military equipment",
        "clothing_class": "minuteman/militia",
        "emotion_profile": ["courage", "fear", "determination", "historic weight"],
        "key_scenes": [
            "responding to alarm",
            "gathering at Concord",
            "facing British regulars",
            "battle at North Bridge",
            "processing first combat"
        ]
    },

    15: {
        "name": "Hannah",
        "age": 16,
        "gender": "female",
        "ethnicity": "English Colonial",
        "year": 1776,
        "location": "Philadelphia, Pennsylvania",
        "role": "Daughter of a Philadelphia delegate",
        "physical_description": "16-year-old delegate's daughter, well-dressed Philadelphia elite",
        "clothing_class": "gentry",
        "emotion_profile": ["idealism", "hope", "understanding of sacrifice"],
        "key_scenes": [
            "Philadelphia during Congress",
            "father discussing independence",
            "reading Common Sense",
            "hearing Declaration read",
            "celebrating independence"
        ]
    },

    16: {
        "name": "Joseph",
        "age": 17,
        "gender": "male",
        "ethnicity": "English Colonial",
        "year": 1777,
        "location": "Valley Forge, Pennsylvania",
        "role": "Continental Army soldier",
        "physical_description": "17-year-old Continental soldier, ragged uniform, thin and weary",
        "clothing_class": "Continental Army (ragged)",
        "emotion_profile": ["suffering", "endurance", "transformation", "brotherhood"],
        "key_scenes": [
            "arriving at Valley Forge",
            "building log huts in snow",
            "suffering through winter",
            "Von Steuben's training",
            "emerging transformed in spring"
        ]
    },

    17: {
        "name": "Marcus",
        "age": 16,
        "gender": "male",
        "ethnicity": "African American",
        "year": 1781,
        "location": "Yorktown, Virginia",
        "role": "Son of a freed Black soldier",
        "physical_description": "16-year-old African American boy, son of Black Continental soldier",
        "clothing_class": "free Black family",
        "emotion_profile": ["pride", "hope", "awareness of incomplete freedom"],
        "key_scenes": [
            "Yorktown siege",
            "father serving in Continental forces",
            "witnessing British surrender",
            "celebrating victory",
            "questioning meaning of freedom"
        ]
    },

    18: {
        "name": "Rebecca",
        "age": 15,
        "gender": "female",
        "ethnicity": "American",
        "year": 1787,
        "location": "Philadelphia, Pennsylvania",
        "role": "Daughter of a Pennsylvania delegate",
        "physical_description": "15-year-old delegate's daughter, late 18th century dress",
        "clothing_class": "gentry",
        "emotion_profile": ["hope", "understanding of compromise", "idealism"],
        "key_scenes": [
            "Philadelphia during Convention",
            "father returning from debates",
            "learning about Constitution",
            "witnessing signing",
            "hopeful about new nation"
        ]
    },

    19: {
        "name": "Eleanor",
        "age": 14,
        "gender": "female",
        "ethnicity": "American",
        "year": 1789,
        "location": "New York City",
        "role": "New York City resident",
        "physical_description": "14-year-old New York girl, late 18th century dress",
        "clothing_class": "urban middle class",
        "emotion_profile": ["awe", "patriotism", "historic awareness"],
        "key_scenes": [
            "New York streets during inauguration",
            "crowds gathering",
            "Washington's arrival",
            "inauguration ceremony",
            "celebrating first president"
        ]
    },

    20: {
        "name": "Jacob",
        "age": 16,
        "gender": "male",
        "ethnicity": "American",
        "year": 1791,
        "location": "United States",
        "role": "Apprentice to a newspaper printer",
        "physical_description": "16-year-old printer's apprentice, working-class appearance",
        "clothing_class": "apprentice",
        "emotion_profile": ["intellectual curiosity", "appreciation of rights"],
        "key_scenes": [
            "print shop",
            "setting type for newspaper",
            "discussing Bill of Rights",
            "printing rights documents",
            "appreciating press freedom"
        ]
    },

    # =========================================================================
    # LESSONS 21-30: Early Republic & Jacksonian Era
    # =========================================================================
    21: {
        "name": "Samuel",
        "age": 15,
        "gender": "male",
        "ethnicity": "American",
        "year": 1796,
        "location": "Virginia",
        "role": "Son of a Virginia farmer",
        "physical_description": "15-year-old Virginia farm boy, rural early Republic clothing",
        "clothing_class": "yeoman farmer",
        "emotion_profile": ["confusion", "growing understanding", "choosing sides"],
        "key_scenes": [
            "Virginia farm",
            "hearing political debates",
            "father discussing Hamilton vs Jefferson",
            "local political gathering",
            "forming own opinions"
        ]
    },

    22: {
        "name": "Marie",
        "age": 14,
        "gender": "female",
        "ethnicity": "French-American",
        "year": 1803,
        "location": "New Orleans, Louisiana",
        "role": "Daughter of a French trader",
        "physical_description": "14-year-old French-American girl, Creole-influenced dress",
        "clothing_class": "merchant family (French)",
        "emotion_profile": ["uncertainty", "cultural pride", "adaptation"],
        "key_scenes": [
            "New Orleans French Quarter",
            "news of Louisiana Purchase",
            "family discussing American rule",
            "cultural transitions",
            "maintaining French heritage"
        ]
    },

    23: {
        "name": "William",
        "age": 17,
        "gender": "male",
        "ethnicity": "American",
        "year": 1805,
        "location": "Western frontier",
        "role": "Member of the Corps of Discovery",
        "physical_description": "17-year-old expedition member, worn military/frontier clothing",
        "clothing_class": "expedition/military",
        "emotion_profile": ["wonder", "adventure", "respect for indigenous peoples"],
        "key_scenes": [
            "expedition on river",
            "encountering new landscapes",
            "meeting Native tribes",
            "with Sacagawea",
            "recording discoveries"
        ]
    },

    24: {
        "name": "Daniel",
        "age": 16,
        "gender": "male",
        "ethnicity": "American",
        "year": 1814,
        "location": "Baltimore, Maryland",
        "role": "Militiaman",
        "physical_description": "16-year-old Baltimore militiaman, War of 1812 era military",
        "clothing_class": "militia",
        "emotion_profile": ["patriotism", "courage", "national pride"],
        "key_scenes": [
            "Baltimore during British attack",
            "defending Fort McHenry",
            "watching bombardment",
            "flag still flying at dawn",
            "celebrating victory"
        ]
    },

    25: {
        "name": "Clara",
        "age": 15,
        "gender": "female",
        "ethnicity": "American",
        "year": 1823,
        "location": "Washington D.C.",
        "role": "Daughter of a State Department clerk",
        "physical_description": "15-year-old Washington D.C. girl, early 1820s dress",
        "clothing_class": "government family",
        "emotion_profile": ["pride", "understanding of America's world role"],
        "key_scenes": [
            "Washington D.C. government buildings",
            "father discussing foreign policy",
            "learning about Monroe Doctrine",
            "understanding America's role",
            "pride in nation's stance"
        ]
    },

    26: {
        "name": "Thomas",
        "age": 15,
        "gender": "male",
        "ethnicity": "American",
        "year": 1829,
        "location": "Western frontier",
        "role": "Son of a western farmer",
        "physical_description": "15-year-old frontier farm boy, practical western clothing",
        "clothing_class": "frontier farmer",
        "emotion_profile": ["pride in democracy", "populist enthusiasm"],
        "key_scenes": [
            "frontier farm",
            "Jackson's election celebration",
            "common man politics",
            "local political gathering",
            "democratic participation"
        ]
    },

    27: {
        "name": "Sarah",
        "age": 14,
        "gender": "female",
        "ethnicity": "Cherokee",
        "year": 1838,
        "location": "Cherokee Nation",
        "role": "Cherokee girl facing removal",
        "physical_description": "14-year-old Cherokee girl, adapted European dress with traditional elements",
        "clothing_class": "Cherokee (adapted)",
        "emotion_profile": ["grief", "anger", "resilience", "love of homeland"],
        "key_scenes": [
            "Cherokee home before removal",
            "soldiers arriving",
            "forced march beginning",
            "Trail of Tears journey",
            "loss and resilience"
        ]
    },

    28: {
        "name": "James",
        "age": 16,
        "gender": "male",
        "ethnicity": "American",
        "year": 1832,
        "location": "South Carolina",
        "role": "South Carolina youth",
        "physical_description": "16-year-old South Carolina boy, Southern gentleman's son",
        "clothing_class": "Southern gentry",
        "emotion_profile": ["regional pride", "political passion", "conflict"],
        "key_scenes": [
            "South Carolina plantation",
            "nullification debates",
            "political tensions",
            "state vs federal conflict",
            "uncertain resolution"
        ]
    },

    29: {
        "name": "Emily",
        "age": 15,
        "gender": "female",
        "ethnicity": "American",
        "year": 1831,
        "location": "New York",
        "role": "New York girl",
        "physical_description": "15-year-old upstate New York girl, 1830s dress",
        "clothing_class": "middling farmer's family",
        "emotion_profile": ["spiritual awakening", "reform enthusiasm"],
        "key_scenes": [
            "revival meeting",
            "burned-over district",
            "religious fervor",
            "reform movements",
            "personal transformation"
        ]
    },

    30: {
        "name": "Charlotte",
        "age": 17,
        "gender": "female",
        "ethnicity": "American",
        "year": 1848,
        "location": "Seneca Falls, New York",
        "role": "Convention attendee",
        "physical_description": "17-year-old convention attendee, 1840s dress with reform sensibilities",
        "clothing_class": "reform-minded middle class",
        "emotion_profile": ["determination", "hope", "feminist awakening"],
        "key_scenes": [
            "Seneca Falls Convention",
            "listening to speeches",
            "Declaration of Sentiments",
            "women's rights debate",
            "hope for equality"
        ]
    },

    # =========================================================================
    # LESSONS 31-40: Expansion & Civil War
    # =========================================================================
    31: {
        "name": "Samuel",
        "age": 16,
        "gender": "male",
        "ethnicity": "American",
        "year": 1846,
        "location": "Oregon Trail",
        "role": "Pioneer on Oregon Trail",
        "physical_description": "16-year-old pioneer boy, practical trail clothing",
        "clothing_class": "pioneer",
        "emotion_profile": ["adventure", "hardship", "hope for new life"],
        "key_scenes": [
            "covered wagon journey",
            "trail camp",
            "crossing difficult terrain",
            "family hardships",
            "reaching destination"
        ]
    },

    32: {
        "name": "Miguel",
        "age": 16,
        "gender": "male",
        "ethnicity": "Mexican-American",
        "year": 1847,
        "location": "Texas/Mexico border",
        "role": "American soldier of Mexican heritage",
        "physical_description": "16-year-old Mexican-American soldier, U.S. Army uniform",
        "clothing_class": "U.S. Army",
        "emotion_profile": ["identity conflict", "duty", "questioning war's justice"],
        "key_scenes": [
            "military camp",
            "conflicted about fighting",
            "Mexican-American War battles",
            "questioning loyalty",
            "identity resolution"
        ]
    },

    33: {
        "name": "Anna",
        "age": 15,
        "gender": "female",
        "ethnicity": "American",
        "year": 1850,
        "location": "California",
        "role": "California girl",
        "physical_description": "15-year-old California girl, western frontier dress",
        "clothing_class": "frontier/California",
        "emotion_profile": ["hope", "awareness of national tensions"],
        "key_scenes": [
            "California Gold Rush era",
            "new state entering Union",
            "diverse California population",
            "hearing about Compromise",
            "uncertain future"
        ]
    },

    34: {
        "name": "Rebecca",
        "age": 14,
        "gender": "female",
        "ethnicity": "American",
        "year": 1852,
        "location": "Northern states",
        "role": "Northern girl",
        "physical_description": "14-year-old Northern girl, 1850s dress",
        "clothing_class": "Northern middle class",
        "emotion_profile": ["shock", "moral awakening", "determination to act"],
        "key_scenes": [
            "reading Uncle Tom's Cabin",
            "emotional reaction to book",
            "discussing with family",
            "abolitionist awareness",
            "commitment to end slavery"
        ]
    },

    35: {
        "name": "John",
        "age": 17,
        "gender": "male",
        "ethnicity": "American",
        "year": 1856,
        "location": "Kansas Territory",
        "role": "Kansas settler",
        "physical_description": "17-year-old Kansas settler, armed frontier clothing",
        "clothing_class": "frontier settler",
        "emotion_profile": ["fear", "determination", "choosing sides"],
        "key_scenes": [
            "Kansas Territory conflict",
            "Bleeding Kansas violence",
            "defending homestead",
            "political conflict",
            "uncertain future"
        ]
    },

    36: {
        "name": "Frederick",
        "age": 16,
        "gender": "male",
        "ethnicity": "African American",
        "year": 1857,
        "location": "Pennsylvania",
        "role": "Free Black youth",
        "physical_description": "16-year-old free Black youth, neat modest clothing",
        "clothing_class": "free Black Northern",
        "emotion_profile": ["anger", "fear", "determination for justice"],
        "key_scenes": [
            "Northern city setting",
            "hearing Dred Scott news",
            "family discussion",
            "fear for future",
            "resolve for justice"
        ]
    },

    37: {
        "name": "William",
        "age": 15,
        "gender": "male",
        "ethnicity": "American",
        "year": 1860,
        "location": "South Carolina",
        "role": "South Carolina youth",
        "physical_description": "15-year-old South Carolina boy, Southern clothing",
        "clothing_class": "Southern middle class",
        "emotion_profile": ["confusion", "fear", "family loyalty"],
        "key_scenes": [
            "Lincoln election news",
            "secession discussions",
            "family divided",
            "watching events unfold",
            "uncertain future"
        ]
    },

    38: {
        "name": "Thomas",
        "age": 17,
        "gender": "male",
        "ethnicity": "American",
        "year": 1862,
        "location": "Northern states",
        "role": "Union soldier",
        "physical_description": "17-year-old Union soldier, blue uniform",
        "clothing_class": "Union Army",
        "emotion_profile": ["patriotism", "fear", "loss of innocence"],
        "key_scenes": [
            "enlisting",
            "training camp",
            "first battle",
            "loss of comrades",
            "hardened soldier"
        ]
    },

    39: {
        "name": "Sarah",
        "age": 15,
        "gender": "female",
        "ethnicity": "American",
        "year": 1863,
        "location": "Gettysburg, Pennsylvania",
        "role": "Gettysburg resident",
        "physical_description": "15-year-old Gettysburg girl, Pennsylvania Dutch influence",
        "clothing_class": "Pennsylvania German",
        "emotion_profile": ["terror", "grief", "resilience"],
        "key_scenes": [
            "before battle arrives",
            "battle begins",
            "hiding during fighting",
            "aftermath horror",
            "helping wounded"
        ]
    },

    40: {
        "name": "Daniel",
        "age": 16,
        "gender": "male",
        "ethnicity": "American",
        "year": 1865,
        "location": "Virginia",
        "role": "Union soldier",
        "physical_description": "16-year-old Union soldier, worn blue uniform",
        "clothing_class": "Union Army (veteran)",
        "emotion_profile": ["relief", "grief", "uncertainty about future"],
        "key_scenes": [
            "Appomattox surrender",
            "war ending",
            "Lincoln assassination news",
            "mourning Lincoln",
            "uncertain peace"
        ]
    },

    # =========================================================================
    # LESSONS 41-51: Reconstruction through Progressive Era
    # =========================================================================
    41: {
        "name": "Marcus",
        "age": 15,
        "gender": "male",
        "ethnicity": "African American",
        "year": 1865,
        "location": "Georgia",
        "role": "Freed slave",
        "physical_description": "15-year-old freedman, transitioning from slave to free clothing",
        "clothing_class": "freedman (transitioning)",
        "emotion_profile": ["joy", "hope", "determination", "awareness of challenges"],
        "key_scenes": [
            "learning of freedom",
            "leaving plantation",
            "Freedmen's Bureau",
            "seeking education",
            "building new life"
        ]
    },

    42: {
        "name": "Eliza",
        "age": 16,
        "gender": "female",
        "ethnicity": "African American",
        "year": 1868,
        "location": "South Carolina",
        "role": "Freed slave",
        "physical_description": "16-year-old freedwoman, modest dress, dignity emphasized",
        "clothing_class": "freedwoman",
        "emotion_profile": ["hope", "education hunger", "political awareness"],
        "key_scenes": [
            "freedmen's school",
            "learning to read",
            "family voting",
            "Black political participation",
            "building community"
        ]
    },

    43: {
        "name": "Samuel",
        "age": 17,
        "gender": "male",
        "ethnicity": "African American",
        "year": 1877,
        "location": "Mississippi",
        "role": "Black voter",
        "physical_description": "17-year-old African American man, modest but respectable dress",
        "clothing_class": "African American (Southern)",
        "emotion_profile": ["disappointment", "anger", "resilience"],
        "key_scenes": [
            "attempting to vote",
            "intimidation",
            "Reconstruction ending",
            "Federal troops leaving",
            "maintaining hope"
        ]
    },

    44: {
        "name": "Anna",
        "age": 15,
        "gender": "female",
        "ethnicity": "American",
        "year": 1890,
        "location": "New York City",
        "role": "Factory worker",
        "physical_description": "15-year-old factory girl, working-class urban dress",
        "clothing_class": "factory worker",
        "emotion_profile": ["hard work", "class awareness", "desire for better life"],
        "key_scenes": [
            "factory floor",
            "tenement home",
            "working conditions",
            "urban poverty",
            "dreams of better future"
        ]
    },

    45: {
        "name": "Giuseppe",
        "age": 14,
        "gender": "male",
        "ethnicity": "Italian",
        "year": 1892,
        "location": "Ellis Island/New York",
        "role": "Italian immigrant",
        "physical_description": "14-year-old Italian immigrant boy, transitioning from Italian peasant to American clothing",
        "clothing_class": "immigrant (transitioning)",
        "emotion_profile": ["hope", "fear", "wonder", "determination"],
        "key_scenes": [
            "ship arriving",
            "Ellis Island processing",
            "entering New York",
            "tenement life",
            "American dream"
        ]
    },

    46: {
        "name": "Michael",
        "age": 17,
        "gender": "male",
        "ethnicity": "Irish-American",
        "year": 1886,
        "location": "United States",
        "role": "Factory worker",
        "physical_description": "17-year-old Irish-American factory worker, working-class clothing",
        "clothing_class": "industrial worker",
        "emotion_profile": ["anger at injustice", "solidarity", "hope for change"],
        "key_scenes": [
            "factory work",
            "labor organizing",
            "strike activities",
            "worker solidarity",
            "fighting for rights"
        ]
    },

    47: {
        "name": "Emma",
        "age": 16,
        "gender": "female",
        "ethnicity": "American",
        "year": 1896,
        "location": "Kansas",
        "role": "Kansas farm daughter",
        "physical_description": "16-year-old Kansas farm girl, practical Plains dress",
        "clothing_class": "Plains farmer",
        "emotion_profile": ["frustration", "political awakening", "hope"],
        "key_scenes": [
            "Kansas farm",
            "economic hardship",
            "populist rally",
            "Bryan campaign",
            "political hope"
        ]
    },

    48: {
        "name": "Catherine",
        "age": 15,
        "gender": "female",
        "ethnicity": "American",
        "year": 1910,
        "location": "Chicago, Illinois",
        "role": "Settlement house worker",
        "physical_description": "15-year-old settlement house volunteer, practical Edwardian dress",
        "clothing_class": "reform-minded middle class",
        "emotion_profile": ["compassion", "determination", "progressive idealism"],
        "key_scenes": [
            "Hull House style setting",
            "helping immigrants",
            "urban reform",
            "progressive activism",
            "hope for change"
        ]
    },

    49: {
        "name": "Alice",
        "age": 16,
        "gender": "female",
        "ethnicity": "American",
        "year": 1920,
        "location": "United States",
        "role": "Suffragist",
        "physical_description": "16-year-old suffragist, white dress with sash",
        "clothing_class": "suffragist",
        "emotion_profile": ["determination", "triumph", "hope for equality"],
        "key_scenes": [
            "suffrage march",
            "protest activities",
            "19th Amendment passage",
            "celebration",
            "first women voting"
        ]
    },

    50: {
        "name": "James",
        "age": 18,
        "gender": "male",
        "ethnicity": "American",
        "year": 1918,
        "location": "France",
        "role": "American soldier in France",
        "physical_description": "18-year-old American Doughboy, olive drab uniform",
        "clothing_class": "AEF soldier",
        "emotion_profile": ["fear", "courage", "disillusionment", "brotherhood"],
        "key_scenes": [
            "trenches in France",
            "over the top attack",
            "battlefield horror",
            "comradeship",
            "armistice"
        ]
    },

    51: {
        "name": "Theodore Roosevelt",
        "age": "adult",
        "gender": "male",
        "ethnicity": "American",
        "year": 1901,
        "location": "Washington, D.C.",
        "role": "26th President of the United States",
        "physical_description": "Adult Theodore Roosevelt, pince-nez glasses, robust physique, energetic bearing",
        "clothing_class": "President/statesman",
        "emotion_profile": ["confidence", "enthusiasm", "vigor", "leadership"],
        "key_scenes": [
            "Rough Rider imagery",
            "becoming President",
            "progressive policies",
            "trust-busting",
            "conservation"
        ]
    }
}


def get_narrator(lesson_number: int) -> dict:
    """
    Get narrator information for a specific lesson.

    Args:
        lesson_number: The lesson number (1-51)

    Returns:
        Dictionary with narrator information
    """
    return NARRATORS.get(lesson_number, {})


def get_narrator_description(lesson_number: int) -> str:
    """
    Get a formatted description string for image generation.

    Args:
        lesson_number: The lesson number (1-51)

    Returns:
        Formatted description string
    """
    narrator = get_narrator(lesson_number)
    if not narrator:
        return ""

    age = narrator.get("age", "unknown")
    if isinstance(age, int):
        age_str = f"{age}-year-old"
    else:
        age_str = age

    return (
        f"{age_str} {narrator.get('ethnicity', '')} "
        f"{narrator.get('gender', '')} named {narrator.get('name', 'Unknown')}"
    ).strip()


def get_scene_for_chapter(lesson_number: int, chapter_number: int) -> str:
    """
    Get the key scene description for a specific chapter.

    Args:
        lesson_number: The lesson number (1-51)
        chapter_number: The chapter number (1-5)

    Returns:
        Scene description string
    """
    narrator = get_narrator(lesson_number)
    key_scenes = narrator.get("key_scenes", [])

    if 1 <= chapter_number <= len(key_scenes):
        return key_scenes[chapter_number - 1]

    return ""


def get_emotion_for_chapter(lesson_number: int, chapter_number: int) -> str:
    """
    Get appropriate emotion based on chapter type.

    Args:
        lesson_number: The lesson number (1-51)
        chapter_number: The chapter number (1-5)

    Returns:
        Emotion/mood string
    """
    narrator = get_narrator(lesson_number)
    emotions = narrator.get("emotion_profile", [])

    # Map chapter numbers to typical emotional progression
    chapter_emotion_map = {
        1: 0,  # Journey Begins - first emotion
        2: 1,  # Survival/Struggle - second emotion
        3: 2,  # Building - third emotion
        4: 3,  # Conflict - fourth emotion (if available)
        5: -1  # Reflections - last emotion
    }

    idx = chapter_emotion_map.get(chapter_number, 0)
    if emotions:
        if idx == -1:
            return emotions[-1]
        elif 0 <= idx < len(emotions):
            return emotions[idx]
        else:
            return emotions[0]

    return "thoughtful"


def get_all_narrators_by_ethnicity() -> dict:
    """
    Group all narrators by ethnicity for reference.

    Returns:
        Dictionary mapping ethnicity to list of lesson numbers
    """
    by_ethnicity = {}
    for lesson_num, narrator in NARRATORS.items():
        ethnicity = narrator.get("ethnicity", "Unknown")
        if ethnicity not in by_ethnicity:
            by_ethnicity[ethnicity] = []
        by_ethnicity[ethnicity].append(lesson_num)

    return by_ethnicity


def get_all_narrators_by_gender() -> dict:
    """
    Group all narrators by gender for reference.

    Returns:
        Dictionary mapping gender to list of lesson numbers
    """
    by_gender = {"male": [], "female": []}
    for lesson_num, narrator in NARRATORS.items():
        gender = narrator.get("gender", "unknown")
        if gender in by_gender:
            by_gender[gender].append(lesson_num)

    return by_gender


def get_narrators_by_era(start_year: int, end_year: int) -> list:
    """
    Get all narrators from a specific time period.

    Args:
        start_year: Beginning of time period
        end_year: End of time period

    Returns:
        List of (lesson_number, narrator) tuples
    """
    result = []
    for lesson_num, narrator in NARRATORS.items():
        year = narrator.get("year", 0)
        if start_year <= year <= end_year:
            result.append((lesson_num, narrator))

    return sorted(result, key=lambda x: x[1].get("year", 0))


if __name__ == "__main__":
    # Test the module
    print("Testing narrator_specs.py")
    print("=" * 60)

    # Test a few narrators
    for lesson in [1, 17, 27, 45, 51]:
        narrator = get_narrator(lesson)
        print(f"\nLesson {lesson}: {narrator.get('name', 'Unknown')}")
        print(f"  Description: {get_narrator_description(lesson)}")
        print(f"  Year: {narrator.get('year')}")
        print(f"  Location: {narrator.get('location')}")
        print(f"  Chapter 1 Scene: {get_scene_for_chapter(lesson, 1)}")

    # Show ethnicity breakdown
    print("\n" + "=" * 60)
    print("Narrators by Ethnicity:")
    for eth, lessons in sorted(get_all_narrators_by_ethnicity().items()):
        print(f"  {eth}: Lessons {lessons}")

    # Show gender breakdown
    print("\nNarrators by Gender:")
    for gender, lessons in get_all_narrators_by_gender().items():
        print(f"  {gender.capitalize()}: {len(lessons)} narrators")
