"""
Historical Accuracy Checker for History Lessons
Scans all lessons for chronological anachronisms and historical inaccuracies.

This tool:
1. Extracts the time period from each lesson's narrator context
2. Scans lesson text for references to historical events, places, people
3. Checks if those references are chronologically appropriate
4. Generates detailed reports of potential errors
5. Can auto-fix issues with corrected text suggestions

Usage:
    python historical_accuracy_checker.py --scan           # Scan all lessons
    python historical_accuracy_checker.py --scan --fix     # Scan and generate fixes
    python historical_accuracy_checker.py --report         # Generate full report
"""

import os
import re
import json
import argparse
from datetime import datetime
from typing import Dict, List, Tuple, Optional

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
LESSONS_FILE = os.path.join(PROJECT_DIR, "data", "lessons.ts")
REPORTS_DIR = os.path.join(PROJECT_DIR, "accuracy_reports")

# =============================================================================
# HISTORICAL TIMELINE DATABASE
# =============================================================================
# Format: "term": {"founded": year, "ended": year (optional), "type": type, "context": description}

HISTORICAL_TIMELINE = {
    # =========================================================================
    # SETTLEMENTS & COLONIES
    # =========================================================================
    "Santo Domingo": {
        "founded": 1496,
        "type": "settlement",
        "context": "First permanent European settlement in Americas, on Hispaniola"
    },
    "San Juan": {
        "founded": 1521,
        "type": "settlement",
        "context": "Spanish colonial capital of Puerto Rico"
    },
    "Havana": {
        "founded": 1519,
        "type": "settlement",
        "context": "Spanish colonial city in Cuba"
    },
    "Mexico City": {
        "founded": 1521,
        "type": "settlement",
        "context": "Built on ruins of Tenochtitlan, capital of New Spain"
    },
    "Lima": {
        "founded": 1535,
        "type": "settlement",
        "context": "Spanish colonial capital of Peru"
    },
    "St. Augustine": {
        "founded": 1565,
        "type": "settlement",
        "context": "First permanent European settlement in continental US"
    },
    "Fort Caroline": {
        "founded": 1564,
        "ended": 1565,
        "type": "settlement",
        "context": "French Huguenot settlement in Florida, destroyed by Spanish"
    },
    "Roanoke": {
        "founded": 1585,
        "ended": 1590,
        "type": "settlement",
        "context": "Failed English colony, the 'Lost Colony'"
    },
    "Jamestown": {
        "founded": 1607,
        "type": "settlement",
        "context": "First permanent English settlement in Americas"
    },
    "Quebec": {
        "founded": 1608,
        "type": "settlement",
        "context": "French colonial settlement in Canada"
    },
    "Santa Fe": {
        "founded": 1610,
        "type": "settlement",
        "context": "Spanish colonial capital of New Mexico"
    },
    "Plymouth": {
        "founded": 1620,
        "type": "settlement",
        "context": "Pilgrim settlement in Massachusetts"
    },
    "New Amsterdam": {
        "founded": 1626,
        "ended": 1664,
        "type": "settlement",
        "context": "Dutch colonial settlement, became New York"
    },
    "Massachusetts Bay": {
        "founded": 1630,
        "type": "settlement",
        "context": "Puritan colony in New England"
    },
    "Boston": {
        "founded": 1630,
        "type": "settlement",
        "context": "Capital of Massachusetts Bay Colony"
    },
    "Maryland": {
        "founded": 1634,
        "type": "settlement",
        "context": "Catholic colony founded by Lord Baltimore"
    },
    "Providence": {
        "founded": 1636,
        "type": "settlement",
        "context": "Founded by Roger Williams in Rhode Island"
    },
    "Hartford": {
        "founded": 1636,
        "type": "settlement",
        "context": "Connecticut colony settlement"
    },
    "New Haven": {
        "founded": 1638,
        "type": "settlement",
        "context": "Puritan colony in Connecticut"
    },
    "Charleston": {
        "founded": 1670,
        "type": "settlement",
        "context": "Colonial port city in South Carolina"
    },
    "Philadelphia": {
        "founded": 1682,
        "type": "settlement",
        "context": "Founded by William Penn in Pennsylvania"
    },
    "New Orleans": {
        "founded": 1718,
        "type": "settlement",
        "context": "French colonial city in Louisiana"
    },
    "Savannah": {
        "founded": 1733,
        "type": "settlement",
        "context": "First settlement in Georgia colony"
    },
    "Baltimore": {
        "founded": 1729,
        "type": "settlement",
        "context": "Maryland port city"
    },
    "Richmond": {
        "founded": 1737,
        "type": "settlement",
        "context": "Virginia city, later Confederate capital"
    },
    "Pittsburgh": {
        "founded": 1758,
        "type": "settlement",
        "context": "Founded at Fort Pitt during French and Indian War"
    },
    "St. Louis": {
        "founded": 1764,
        "type": "settlement",
        "context": "French trading post on Mississippi River"
    },
    "San Francisco": {
        "founded": 1776,
        "type": "settlement",
        "context": "Spanish mission settlement in California"
    },
    "Los Angeles": {
        "founded": 1781,
        "type": "settlement",
        "context": "Spanish pueblo in California"
    },
    "Washington D.C.": {
        "founded": 1790,
        "type": "settlement",
        "context": "National capital established by Residence Act"
    },
    "Chicago": {
        "founded": 1833,
        "type": "settlement",
        "context": "Incorporated as city in Illinois"
    },
    "Houston": {
        "founded": 1836,
        "type": "settlement",
        "context": "Founded after Texas independence"
    },
    "Dallas": {
        "founded": 1841,
        "type": "settlement",
        "context": "Texas settlement"
    },
    "San Antonio": {
        "founded": 1718,
        "type": "settlement",
        "context": "Spanish mission settlement in Texas"
    },

    # =========================================================================
    # COLONIAL ERA EVENTS (1492-1763)
    # =========================================================================
    "Columbian Exchange": {
        "founded": 1492,
        "type": "event",
        "context": "Transfer of plants, animals, diseases between hemispheres"
    },
    "Treaty of Tordesillas": {
        "founded": 1494,
        "type": "event",
        "context": "Spanish-Portuguese division of New World"
    },
    "Encomienda System": {
        "founded": 1503,
        "type": "event",
        "context": "Spanish colonial labor system established"
    },
    "Ponce de León expedition": {
        "founded": 1513,
        "type": "event",
        "context": "First Spanish exploration of Florida"
    },
    "Conquest of the Aztecs": {
        "founded": 1519,
        "ended": 1521,
        "type": "event",
        "context": "Cortés conquers Aztec Empire"
    },
    "Conquest of the Incas": {
        "founded": 1532,
        "ended": 1572,
        "type": "event",
        "context": "Pizarro conquers Inca Empire"
    },
    "de Soto expedition": {
        "founded": 1539,
        "ended": 1543,
        "type": "event",
        "context": "Spanish exploration of American Southeast"
    },
    "Coronado expedition": {
        "founded": 1540,
        "ended": 1542,
        "type": "event",
        "context": "Spanish exploration of American Southwest"
    },
    "Starving Time": {
        "founded": 1609,
        "ended": 1610,
        "type": "event",
        "context": "Winter of starvation at Jamestown"
    },
    "First Anglo-Powhatan War": {
        "founded": 1610,
        "ended": 1614,
        "type": "event",
        "context": "Conflict between Jamestown and Powhatan Confederacy"
    },
    "House of Burgesses": {
        "founded": 1619,
        "type": "event",
        "context": "First representative assembly in American colonies"
    },
    "First Africans in Virginia": {
        "founded": 1619,
        "type": "event",
        "context": "Beginning of African presence in English colonies"
    },
    "Mayflower Compact": {
        "founded": 1620,
        "type": "event",
        "context": "Agreement for self-governance by Pilgrims"
    },
    "First Thanksgiving": {
        "founded": 1621,
        "type": "event",
        "context": "Harvest celebration at Plymouth"
    },
    "Pequot War": {
        "founded": 1636,
        "ended": 1638,
        "type": "event",
        "context": "Conflict between colonists and Pequot tribe"
    },
    "Maryland Toleration Act": {
        "founded": 1649,
        "type": "event",
        "context": "Early religious freedom law in Maryland"
    },
    "Navigation Acts": {
        "founded": 1651,
        "type": "event",
        "context": "British laws regulating colonial trade"
    },
    "King Philip's War": {
        "founded": 1675,
        "ended": 1678,
        "type": "event",
        "context": "Major conflict between colonists and Native Americans"
    },
    "Bacon's Rebellion": {
        "founded": 1676,
        "type": "event",
        "context": "Uprising in Virginia against colonial government"
    },
    "Pueblo Revolt": {
        "founded": 1680,
        "type": "event",
        "context": "Native American uprising against Spanish in New Mexico"
    },
    "Glorious Revolution": {
        "founded": 1688,
        "type": "event",
        "context": "Overthrow of King James II in England"
    },
    "Salem Witch Trials": {
        "founded": 1692,
        "type": "event",
        "context": "Witch trials in Massachusetts"
    },
    "Yamasee War": {
        "founded": 1715,
        "ended": 1717,
        "type": "event",
        "context": "Native American conflict in Carolina"
    },
    "Stono Rebellion": {
        "founded": 1739,
        "type": "event",
        "context": "Largest slave uprising in colonial America"
    },
    "Great Awakening": {
        "founded": 1730,
        "ended": 1755,
        "type": "event",
        "context": "Religious revival movement in colonies"
    },
    "King George's War": {
        "founded": 1744,
        "ended": 1748,
        "type": "event",
        "context": "Colonial conflict between Britain and France"
    },
    "Albany Congress": {
        "founded": 1754,
        "type": "event",
        "context": "Colonial meeting proposing unified government"
    },
    "French and Indian War": {
        "founded": 1754,
        "ended": 1763,
        "type": "event",
        "context": "Colonial war between Britain and France"
    },
    "Braddock's Defeat": {
        "founded": 1755,
        "type": "event",
        "context": "British defeat in French and Indian War"
    },
    "Treaty of Paris 1763": {
        "founded": 1763,
        "type": "event",
        "context": "Ended French and Indian War"
    },
    "Proclamation of 1763": {
        "founded": 1763,
        "type": "event",
        "context": "British ban on westward colonial expansion"
    },

    # =========================================================================
    # REVOLUTIONARY ERA EVENTS (1764-1789)
    # =========================================================================
    "Sugar Act": {
        "founded": 1764,
        "type": "event",
        "context": "British tax on sugar and molasses"
    },
    "Stamp Act": {
        "founded": 1765,
        "type": "event",
        "context": "British tax on printed materials"
    },
    "Stamp Act Congress": {
        "founded": 1765,
        "type": "event",
        "context": "Colonial meeting to protest Stamp Act"
    },
    "Sons of Liberty": {
        "founded": 1765,
        "type": "event",
        "context": "Secret colonial organization opposing British taxes"
    },
    "Quartering Act": {
        "founded": 1765,
        "type": "event",
        "context": "Required colonists to house British soldiers"
    },
    "Townshend Acts": {
        "founded": 1767,
        "type": "event",
        "context": "British taxes on colonial imports"
    },
    "Boston Massacre": {
        "founded": 1770,
        "type": "event",
        "context": "British soldiers kill five colonists"
    },
    "Gaspee Affair": {
        "founded": 1772,
        "type": "event",
        "context": "Colonists burn British ship in Rhode Island"
    },
    "Committees of Correspondence": {
        "founded": 1772,
        "type": "event",
        "context": "Colonial communication network"
    },
    "Tea Act": {
        "founded": 1773,
        "type": "event",
        "context": "British law giving East India Company tea monopoly"
    },
    "Boston Tea Party": {
        "founded": 1773,
        "type": "event",
        "context": "Colonial protest against British taxation"
    },
    "Intolerable Acts": {
        "founded": 1774,
        "type": "event",
        "context": "Punitive British laws against Massachusetts"
    },
    "Coercive Acts": {
        "founded": 1774,
        "type": "event",
        "context": "British punitive measures (same as Intolerable Acts)"
    },
    "First Continental Congress": {
        "founded": 1774,
        "type": "event",
        "context": "Colonial delegates meet to respond to Britain"
    },
    "Battles of Lexington and Concord": {
        "founded": 1775,
        "type": "event",
        "context": "First battles of Revolutionary War"
    },
    "Second Continental Congress": {
        "founded": 1775,
        "type": "event",
        "context": "Colonial governing body during Revolution"
    },
    "Battle of Bunker Hill": {
        "founded": 1775,
        "type": "event",
        "context": "Early Revolutionary War battle"
    },
    "Olive Branch Petition": {
        "founded": 1775,
        "type": "event",
        "context": "Colonial peace attempt rejected by King George III"
    },
    "Common Sense": {
        "founded": 1776,
        "type": "event",
        "context": "Thomas Paine's influential pamphlet"
    },
    "Declaration of Independence": {
        "founded": 1776,
        "type": "event",
        "context": "American independence declared"
    },
    "Battle of Trenton": {
        "founded": 1776,
        "type": "event",
        "context": "Washington's surprise attack on Hessians"
    },
    "Battle of Saratoga": {
        "founded": 1777,
        "type": "event",
        "context": "Turning point of Revolutionary War"
    },
    "Valley Forge": {
        "founded": 1777,
        "ended": 1778,
        "type": "event",
        "context": "Continental Army winter encampment"
    },
    "Articles of Confederation": {
        "founded": 1777,
        "ended": 1789,
        "type": "event",
        "context": "First US governing document"
    },
    "Franco-American Alliance": {
        "founded": 1778,
        "type": "event",
        "context": "France allies with American colonies"
    },
    "Battle of Yorktown": {
        "founded": 1781,
        "type": "event",
        "context": "Final major battle of Revolutionary War"
    },
    "Treaty of Paris 1783": {
        "founded": 1783,
        "type": "event",
        "context": "Ended Revolutionary War, recognized US independence"
    },
    "Shays' Rebellion": {
        "founded": 1786,
        "ended": 1787,
        "type": "event",
        "context": "Farmers' uprising in Massachusetts"
    },
    "Constitutional Convention": {
        "founded": 1787,
        "type": "event",
        "context": "Writing of US Constitution"
    },
    "Northwest Ordinance": {
        "founded": 1787,
        "type": "event",
        "context": "Law organizing Northwest Territory"
    },
    "Federalist Papers": {
        "founded": 1787,
        "ended": 1788,
        "type": "event",
        "context": "Essays promoting Constitution ratification"
    },
    "Constitution Ratification": {
        "founded": 1788,
        "type": "event",
        "context": "US Constitution becomes law"
    },
    "Bill of Rights": {
        "founded": 1791,
        "type": "event",
        "context": "First ten amendments to Constitution"
    },

    # =========================================================================
    # EARLY REPUBLIC EVENTS (1789-1824)
    # =========================================================================
    "Judiciary Act": {
        "founded": 1789,
        "type": "event",
        "context": "Established federal court system"
    },
    "Whiskey Rebellion": {
        "founded": 1794,
        "type": "event",
        "context": "Tax protest in western Pennsylvania"
    },
    "Jay Treaty": {
        "founded": 1794,
        "type": "event",
        "context": "Agreement with Britain on trade issues"
    },
    "Pinckney Treaty": {
        "founded": 1795,
        "type": "event",
        "context": "Agreement with Spain on boundaries"
    },
    "XYZ Affair": {
        "founded": 1797,
        "type": "event",
        "context": "Diplomatic incident with France"
    },
    "Alien and Sedition Acts": {
        "founded": 1798,
        "type": "event",
        "context": "Controversial laws restricting speech and immigration"
    },
    "Kentucky and Virginia Resolutions": {
        "founded": 1798,
        "type": "event",
        "context": "States' rights challenge to federal law"
    },
    "Revolution of 1800": {
        "founded": 1800,
        "type": "event",
        "context": "Peaceful transfer of power to Jefferson"
    },
    "Marbury v. Madison": {
        "founded": 1803,
        "type": "event",
        "context": "Established judicial review"
    },
    "Louisiana Purchase": {
        "founded": 1803,
        "type": "event",
        "context": "US purchase of Louisiana from France"
    },
    "Lewis and Clark Expedition": {
        "founded": 1804,
        "ended": 1806,
        "type": "event",
        "context": "Exploration of Louisiana Territory"
    },
    "Burr-Hamilton Duel": {
        "founded": 1804,
        "type": "event",
        "context": "Vice President Burr kills Alexander Hamilton"
    },
    "Embargo Act": {
        "founded": 1807,
        "type": "event",
        "context": "Jefferson's trade restrictions"
    },
    "Chesapeake-Leopard Affair": {
        "founded": 1807,
        "type": "event",
        "context": "British attack on American ship"
    },
    "War of 1812": {
        "founded": 1812,
        "ended": 1815,
        "type": "event",
        "context": "War between US and Britain"
    },
    "Battle of New Orleans": {
        "founded": 1815,
        "type": "event",
        "context": "Andrew Jackson's victory after war ended"
    },
    "Treaty of Ghent": {
        "founded": 1814,
        "type": "event",
        "context": "Ended War of 1812"
    },
    "Hartford Convention": {
        "founded": 1814,
        "type": "event",
        "context": "Federalist opposition to War of 1812"
    },
    "Era of Good Feelings": {
        "founded": 1815,
        "ended": 1825,
        "type": "event",
        "context": "Period of political unity under Monroe"
    },
    "First Seminole War": {
        "founded": 1817,
        "ended": 1818,
        "type": "event",
        "context": "Conflict in Spanish Florida"
    },
    "Adams-Onis Treaty": {
        "founded": 1819,
        "type": "event",
        "context": "US acquired Florida from Spain"
    },
    "McCulloch v. Maryland": {
        "founded": 1819,
        "type": "event",
        "context": "Supreme Court upholds federal power"
    },
    "Missouri Compromise": {
        "founded": 1820,
        "type": "event",
        "context": "Agreement on slavery in new territories"
    },
    "Monroe Doctrine": {
        "founded": 1823,
        "type": "event",
        "context": "US opposition to European colonization"
    },
    "Gibbons v. Ogden": {
        "founded": 1824,
        "type": "event",
        "context": "Supreme Court expands commerce clause"
    },

    # =========================================================================
    # JACKSONIAN ERA & ANTEBELLUM EVENTS (1824-1860)
    # =========================================================================
    "Corrupt Bargain": {
        "founded": 1824,
        "type": "event",
        "context": "Controversial election of John Quincy Adams"
    },
    "Erie Canal": {
        "founded": 1825,
        "type": "event",
        "context": "Major canal connecting Great Lakes to Atlantic"
    },
    "Tariff of Abominations": {
        "founded": 1828,
        "type": "event",
        "context": "Controversial protective tariff"
    },
    "Indian Removal Act": {
        "founded": 1830,
        "type": "event",
        "context": "Forced relocation of Native Americans"
    },
    "Nat Turner's Rebellion": {
        "founded": 1831,
        "type": "event",
        "context": "Slave uprising in Virginia"
    },
    "Nullification Crisis": {
        "founded": 1832,
        "ended": 1833,
        "type": "event",
        "context": "South Carolina challenges federal tariff"
    },
    "Bank War": {
        "founded": 1832,
        "type": "event",
        "context": "Jackson's fight against Second Bank of US"
    },
    "Trail of Tears": {
        "founded": 1838,
        "ended": 1839,
        "type": "event",
        "context": "Forced Cherokee removal"
    },
    "Panic of 1837": {
        "founded": 1837,
        "type": "event",
        "context": "Major economic depression"
    },
    "Amistad Case": {
        "founded": 1839,
        "type": "event",
        "context": "Supreme Court frees enslaved Africans"
    },
    "Second Great Awakening": {
        "founded": 1790,
        "ended": 1850,
        "type": "event",
        "context": "Religious revival movement"
    },
    "Seneca Falls Convention": {
        "founded": 1848,
        "type": "event",
        "context": "First women's rights convention"
    },
    "Texas Annexation": {
        "founded": 1845,
        "type": "event",
        "context": "Texas becomes US state"
    },
    "Mexican-American War": {
        "founded": 1846,
        "ended": 1848,
        "type": "event",
        "context": "War over Texas border and western territories"
    },
    "Treaty of Guadalupe Hidalgo": {
        "founded": 1848,
        "type": "event",
        "context": "Ended Mexican-American War"
    },
    "California Gold Rush": {
        "founded": 1848,
        "type": "event",
        "context": "Gold discovered at Sutter's Mill"
    },
    "Compromise of 1850": {
        "founded": 1850,
        "type": "event",
        "context": "Series of laws addressing slavery"
    },
    "Fugitive Slave Act": {
        "founded": 1850,
        "type": "event",
        "context": "Required return of escaped slaves"
    },
    "Uncle Tom's Cabin": {
        "founded": 1852,
        "type": "event",
        "context": "Harriet Beecher Stowe's anti-slavery novel"
    },
    "Gadsden Purchase": {
        "founded": 1853,
        "type": "event",
        "context": "US purchase of land from Mexico"
    },
    "Kansas-Nebraska Act": {
        "founded": 1854,
        "type": "event",
        "context": "Allowed popular sovereignty on slavery"
    },
    "Bleeding Kansas": {
        "founded": 1854,
        "ended": 1861,
        "type": "event",
        "context": "Violence over slavery in Kansas"
    },
    "Republican Party Founded": {
        "founded": 1854,
        "type": "event",
        "context": "Anti-slavery political party formed"
    },
    "Dred Scott Decision": {
        "founded": 1857,
        "type": "event",
        "context": "Supreme Court rules against enslaved man"
    },
    "Panic of 1857": {
        "founded": 1857,
        "type": "event",
        "context": "Economic depression"
    },
    "Lincoln-Douglas Debates": {
        "founded": 1858,
        "type": "event",
        "context": "Senate campaign debates on slavery"
    },
    "John Brown's Raid": {
        "founded": 1859,
        "type": "event",
        "context": "Attack on Harpers Ferry arsenal"
    },
    "Harpers Ferry Raid": {
        "founded": 1859,
        "type": "event",
        "context": "John Brown's attack on federal arsenal"
    },

    # =========================================================================
    # CIVIL WAR & RECONSTRUCTION EVENTS (1860-1877)
    # =========================================================================
    "Lincoln's Election": {
        "founded": 1860,
        "type": "event",
        "context": "Abraham Lincoln elected president"
    },
    "Secession": {
        "founded": 1860,
        "ended": 1861,
        "type": "event",
        "context": "Southern states leave the Union"
    },
    "Confederate States of America": {
        "founded": 1861,
        "ended": 1865,
        "type": "event",
        "context": "Southern nation during Civil War"
    },
    "Fort Sumter": {
        "founded": 1861,
        "type": "event",
        "context": "First shots of Civil War"
    },
    "First Battle of Bull Run": {
        "founded": 1861,
        "type": "event",
        "context": "First major battle of Civil War"
    },
    "Civil War": {
        "founded": 1861,
        "ended": 1865,
        "type": "event",
        "context": "American Civil War"
    },
    "Trent Affair": {
        "founded": 1861,
        "type": "event",
        "context": "Diplomatic incident with Britain"
    },
    "Battle of Shiloh": {
        "founded": 1862,
        "type": "event",
        "context": "Major Civil War battle in Tennessee"
    },
    "Battle of Antietam": {
        "founded": 1862,
        "type": "event",
        "context": "Bloodiest single day in American history"
    },
    "Homestead Act": {
        "founded": 1862,
        "type": "event",
        "context": "Free land for western settlers"
    },
    "Pacific Railroad Acts": {
        "founded": 1862,
        "type": "event",
        "context": "Authorized transcontinental railroad"
    },
    "Emancipation Proclamation": {
        "founded": 1863,
        "type": "event",
        "context": "Lincoln's proclamation freeing slaves"
    },
    "Battle of Gettysburg": {
        "founded": 1863,
        "type": "event",
        "context": "Turning point of Civil War"
    },
    "Siege of Vicksburg": {
        "founded": 1863,
        "type": "event",
        "context": "Union gains control of Mississippi River"
    },
    "Gettysburg Address": {
        "founded": 1863,
        "type": "event",
        "context": "Lincoln's famous speech"
    },
    "New York Draft Riots": {
        "founded": 1863,
        "type": "event",
        "context": "Violent protest against Civil War draft"
    },
    "Sherman's March to the Sea": {
        "founded": 1864,
        "type": "event",
        "context": "Union campaign through Georgia"
    },
    "Appomattox Court House": {
        "founded": 1865,
        "type": "event",
        "context": "Lee surrenders to Grant"
    },
    "Lincoln's Assassination": {
        "founded": 1865,
        "type": "event",
        "context": "President Lincoln killed by John Wilkes Booth"
    },
    "Thirteenth Amendment": {
        "founded": 1865,
        "type": "event",
        "context": "Abolished slavery"
    },
    "Freedmen's Bureau": {
        "founded": 1865,
        "type": "event",
        "context": "Agency to help former slaves"
    },
    "Black Codes": {
        "founded": 1865,
        "type": "event",
        "context": "Southern laws restricting Black rights"
    },
    "Reconstruction": {
        "founded": 1865,
        "ended": 1877,
        "type": "event",
        "context": "Post-Civil War rebuilding period"
    },
    "Civil Rights Act of 1866": {
        "founded": 1866,
        "type": "event",
        "context": "First civil rights law"
    },
    "Fourteenth Amendment": {
        "founded": 1868,
        "type": "event",
        "context": "Citizenship and equal protection"
    },
    "Impeachment of Andrew Johnson": {
        "founded": 1868,
        "type": "event",
        "context": "First presidential impeachment trial"
    },
    "Fifteenth Amendment": {
        "founded": 1870,
        "type": "event",
        "context": "Voting rights regardless of race"
    },
    "Ku Klux Klan Act": {
        "founded": 1871,
        "type": "event",
        "context": "Law against KKK terrorism"
    },
    "Credit Mobilier Scandal": {
        "founded": 1872,
        "type": "event",
        "context": "Railroad corruption scandal"
    },
    "Panic of 1873": {
        "founded": 1873,
        "type": "event",
        "context": "Major economic depression"
    },
    "Slaughterhouse Cases": {
        "founded": 1873,
        "type": "event",
        "context": "Supreme Court limits 14th Amendment"
    },
    "Disputed Election of 1876": {
        "founded": 1876,
        "type": "event",
        "context": "Contested Hayes-Tilden election"
    },
    "Compromise of 1877": {
        "founded": 1877,
        "type": "event",
        "context": "Ended Reconstruction"
    },

    # =========================================================================
    # GILDED AGE & PROGRESSIVE ERA EVENTS (1877-1920)
    # =========================================================================
    "Great Railroad Strike": {
        "founded": 1877,
        "type": "event",
        "context": "First nationwide labor strike"
    },
    "Chinese Exclusion Act": {
        "founded": 1882,
        "type": "event",
        "context": "Ban on Chinese immigration"
    },
    "Civil Rights Cases": {
        "founded": 1883,
        "type": "event",
        "context": "Supreme Court limits civil rights protections"
    },
    "Haymarket Affair": {
        "founded": 1886,
        "type": "event",
        "context": "Labor protest and bombing in Chicago"
    },
    "American Federation of Labor": {
        "founded": 1886,
        "type": "event",
        "context": "Major labor union founded"
    },
    "Dawes Act": {
        "founded": 1887,
        "type": "event",
        "context": "Divided tribal lands into individual plots"
    },
    "Interstate Commerce Act": {
        "founded": 1887,
        "type": "event",
        "context": "First federal regulation of railroads"
    },
    "Sherman Antitrust Act": {
        "founded": 1890,
        "type": "event",
        "context": "First antitrust law"
    },
    "Wounded Knee Massacre": {
        "founded": 1890,
        "type": "event",
        "context": "US Army kills Lakota at Wounded Knee"
    },
    "Populist Party": {
        "founded": 1891,
        "type": "event",
        "context": "Farmers' political movement"
    },
    "Homestead Strike": {
        "founded": 1892,
        "type": "event",
        "context": "Violent steel workers' strike"
    },
    "Panic of 1893": {
        "founded": 1893,
        "type": "event",
        "context": "Severe economic depression"
    },
    "Pullman Strike": {
        "founded": 1894,
        "type": "event",
        "context": "Railroad workers' strike"
    },
    "Plessy v. Ferguson": {
        "founded": 1896,
        "type": "event",
        "context": "Supreme Court upholds segregation"
    },
    "Cross of Gold Speech": {
        "founded": 1896,
        "type": "event",
        "context": "William Jennings Bryan's famous speech"
    },
    "Spanish-American War": {
        "founded": 1898,
        "type": "event",
        "context": "War with Spain over Cuba"
    },
    "USS Maine explosion": {
        "founded": 1898,
        "type": "event",
        "context": "Ship explosion leading to Spanish-American War"
    },
    "Treaty of Paris 1898": {
        "founded": 1898,
        "type": "event",
        "context": "US gains Philippines, Puerto Rico, Guam"
    },
    "Philippine-American War": {
        "founded": 1899,
        "ended": 1902,
        "type": "event",
        "context": "US war to suppress Philippine independence"
    },
    "Open Door Policy": {
        "founded": 1899,
        "type": "event",
        "context": "US policy on trade with China"
    },
    "Boxer Rebellion": {
        "founded": 1900,
        "type": "event",
        "context": "Anti-foreign uprising in China"
    },
    "McKinley Assassination": {
        "founded": 1901,
        "type": "event",
        "context": "President McKinley killed"
    },
    "Panama Canal": {
        "founded": 1904,
        "ended": 1914,
        "type": "event",
        "context": "US-built canal across Panama"
    },
    "Roosevelt Corollary": {
        "founded": 1904,
        "type": "event",
        "context": "Extension of Monroe Doctrine"
    },
    "Meat Inspection Act": {
        "founded": 1906,
        "type": "event",
        "context": "Federal food safety law"
    },
    "Pure Food and Drug Act": {
        "founded": 1906,
        "type": "event",
        "context": "First consumer protection law"
    },
    "The Jungle": {
        "founded": 1906,
        "type": "event",
        "context": "Upton Sinclair's muckraking novel"
    },
    "NAACP": {
        "founded": 1909,
        "type": "event",
        "context": "Civil rights organization founded"
    },
    "Triangle Shirtwaist Fire": {
        "founded": 1911,
        "type": "event",
        "context": "Factory fire killing 146 workers"
    },
    "Sixteenth Amendment": {
        "founded": 1913,
        "type": "event",
        "context": "Authorized federal income tax"
    },
    "Seventeenth Amendment": {
        "founded": 1913,
        "type": "event",
        "context": "Direct election of senators"
    },
    "Federal Reserve Act": {
        "founded": 1913,
        "type": "event",
        "context": "Created Federal Reserve System"
    },
    "Clayton Antitrust Act": {
        "founded": 1914,
        "type": "event",
        "context": "Strengthened antitrust laws"
    },
    "World War I begins": {
        "founded": 1914,
        "type": "event",
        "context": "Start of World War I in Europe"
    },
    "Lusitania sinking": {
        "founded": 1915,
        "type": "event",
        "context": "German submarine sinks passenger ship"
    },
    "Great Migration": {
        "founded": 1916,
        "ended": 1970,
        "type": "event",
        "context": "African American migration to North"
    },
    "Zimmermann Telegram": {
        "founded": 1917,
        "type": "event",
        "context": "German proposal for Mexico alliance"
    },
    "US enters World War I": {
        "founded": 1917,
        "type": "event",
        "context": "America joins Allied Powers"
    },
    "Espionage Act": {
        "founded": 1917,
        "type": "event",
        "context": "Law criminalizing interference with military"
    },
    "Sedition Act of 1918": {
        "founded": 1918,
        "type": "event",
        "context": "Law restricting criticism of government"
    },
    "Spanish Flu": {
        "founded": 1918,
        "ended": 1920,
        "type": "event",
        "context": "Global pandemic"
    },
    "Treaty of Versailles": {
        "founded": 1919,
        "type": "event",
        "context": "Ended World War I"
    },
    "Red Scare": {
        "founded": 1919,
        "ended": 1920,
        "type": "event",
        "context": "Anti-communist hysteria"
    },
    "Eighteenth Amendment": {
        "founded": 1919,
        "type": "event",
        "context": "Prohibition of alcohol"
    },
    "Nineteenth Amendment": {
        "founded": 1920,
        "type": "event",
        "context": "Women's suffrage"
    },

    # =========================================================================
    # PEOPLE - EXPLORERS & CONQUISTADORS
    # =========================================================================
    "Christopher Columbus": {
        "founded": 1492,
        "type": "person",
        "context": "First voyage to Americas"
    },
    "Amerigo Vespucci": {
        "founded": 1499,
        "type": "person",
        "context": "Explorer, Americas named after him"
    },
    "Juan Ponce de León": {
        "founded": 1513,
        "type": "person",
        "context": "Explored Florida"
    },
    "Hernán Cortés": {
        "founded": 1519,
        "type": "person",
        "context": "Conquest of Aztec Empire"
    },
    "Ferdinand Magellan": {
        "founded": 1519,
        "type": "person",
        "context": "First circumnavigation of Earth"
    },
    "Francisco Pizarro": {
        "founded": 1532,
        "type": "person",
        "context": "Conquest of Inca Empire"
    },
    "Hernando de Soto": {
        "founded": 1539,
        "type": "person",
        "context": "Explored American Southeast"
    },
    "Francisco Coronado": {
        "founded": 1540,
        "type": "person",
        "context": "Explored American Southwest"
    },
    "Pedro Menéndez de Avilés": {
        "founded": 1565,
        "type": "person",
        "context": "Founded St. Augustine"
    },
    "Sir Walter Raleigh": {
        "founded": 1585,
        "type": "person",
        "context": "Sponsored Roanoke colony"
    },
    "Samuel de Champlain": {
        "founded": 1608,
        "type": "person",
        "context": "Founded Quebec, Father of New France"
    },
    "Henry Hudson": {
        "founded": 1609,
        "type": "person",
        "context": "Explored Hudson River for Dutch"
    },

    # =========================================================================
    # PEOPLE - COLONIAL ERA
    # =========================================================================
    "John Smith": {
        "founded": 1607,
        "type": "person",
        "context": "Jamestown leader"
    },
    "Pocahontas": {
        "founded": 1607,
        "ended": 1617,
        "type": "person",
        "context": "Powhatan woman who aided Jamestown"
    },
    "John Rolfe": {
        "founded": 1612,
        "type": "person",
        "context": "Introduced tobacco cultivation to Virginia"
    },
    "William Bradford": {
        "founded": 1620,
        "type": "person",
        "context": "Plymouth Colony governor"
    },
    "Squanto": {
        "founded": 1620,
        "type": "person",
        "context": "Wampanoag who helped Plymouth colonists"
    },
    "Massasoit": {
        "founded": 1620,
        "type": "person",
        "context": "Wampanoag leader who allied with Pilgrims"
    },
    "John Winthrop": {
        "founded": 1630,
        "type": "person",
        "context": "Massachusetts Bay Colony governor"
    },
    "Roger Williams": {
        "founded": 1636,
        "type": "person",
        "context": "Founded Rhode Island, religious freedom advocate"
    },
    "Anne Hutchinson": {
        "founded": 1637,
        "type": "person",
        "context": "Religious dissenter in Massachusetts"
    },
    "Metacom": {
        "founded": 1675,
        "type": "person",
        "context": "Wampanoag leader in King Philip's War"
    },
    "King Philip": {
        "founded": 1675,
        "type": "person",
        "context": "English name for Metacom"
    },
    "Nathaniel Bacon": {
        "founded": 1676,
        "type": "person",
        "context": "Led Bacon's Rebellion"
    },
    "William Penn": {
        "founded": 1682,
        "type": "person",
        "context": "Founded Pennsylvania"
    },
    "Cotton Mather": {
        "founded": 1692,
        "type": "person",
        "context": "Puritan minister during Salem trials"
    },
    "James Oglethorpe": {
        "founded": 1733,
        "type": "person",
        "context": "Founded Georgia colony"
    },
    "Jonathan Edwards": {
        "founded": 1734,
        "type": "person",
        "context": "Great Awakening preacher"
    },
    "George Whitefield": {
        "founded": 1739,
        "type": "person",
        "context": "Great Awakening evangelist"
    },

    # =========================================================================
    # PEOPLE - FOUNDING FATHERS & REVOLUTIONARY ERA
    # =========================================================================
    "Benjamin Franklin": {
        "founded": 1730,
        "type": "person",
        "context": "Founding Father, inventor, diplomat"
    },
    "George Washington": {
        "founded": 1754,
        "type": "person",
        "context": "First President, Revolutionary War general"
    },
    "Samuel Adams": {
        "founded": 1765,
        "type": "person",
        "context": "Patriot leader, organized Boston Tea Party"
    },
    "John Adams": {
        "founded": 1765,
        "type": "person",
        "context": "Second President, Founding Father"
    },
    "Patrick Henry": {
        "founded": 1765,
        "type": "person",
        "context": "Give me liberty or give me death"
    },
    "John Hancock": {
        "founded": 1775,
        "type": "person",
        "context": "President of Continental Congress"
    },
    "Thomas Paine": {
        "founded": 1776,
        "type": "person",
        "context": "Author of Common Sense"
    },
    "Thomas Jefferson": {
        "founded": 1776,
        "type": "person",
        "context": "Author of Declaration of Independence"
    },
    "Alexander Hamilton": {
        "founded": 1776,
        "type": "person",
        "context": "First Treasury Secretary"
    },
    "Benedict Arnold": {
        "founded": 1780,
        "type": "person",
        "context": "Revolutionary War traitor"
    },
    "Marquis de Lafayette": {
        "founded": 1777,
        "type": "person",
        "context": "French ally in Revolution"
    },
    "Baron von Steuben": {
        "founded": 1778,
        "type": "person",
        "context": "Trained Continental Army"
    },
    "James Madison": {
        "founded": 1787,
        "type": "person",
        "context": "Father of the Constitution"
    },

    # =========================================================================
    # PEOPLE - EARLY REPUBLIC & ANTEBELLUM
    # =========================================================================
    "John Marshall": {
        "founded": 1801,
        "type": "person",
        "context": "Chief Justice, established judicial review"
    },
    "Meriwether Lewis": {
        "founded": 1804,
        "type": "person",
        "context": "Led Lewis and Clark Expedition"
    },
    "William Clark": {
        "founded": 1804,
        "type": "person",
        "context": "Co-led Lewis and Clark Expedition"
    },
    "Sacagawea": {
        "founded": 1805,
        "type": "person",
        "context": "Shoshone guide for Lewis and Clark"
    },
    "Tecumseh": {
        "founded": 1808,
        "type": "person",
        "context": "Shawnee leader who resisted US expansion"
    },
    "Andrew Jackson": {
        "founded": 1815,
        "type": "person",
        "context": "7th President, War of 1812 hero"
    },
    "James Monroe": {
        "founded": 1817,
        "type": "person",
        "context": "5th President, Monroe Doctrine"
    },
    "John Quincy Adams": {
        "founded": 1825,
        "type": "person",
        "context": "6th President"
    },
    "John C. Calhoun": {
        "founded": 1810,  # Elected to Congress, War Hawk
        "type": "person",
        "context": "Southern states' rights advocate, War Hawk in 1812"
    },
    "Daniel Webster": {
        "founded": 1830,
        "type": "person",
        "context": "Orator and statesman"
    },
    "Henry Clay": {
        "founded": 1811,  # Speaker of the House, War Hawk
        "type": "person",
        "context": "The Great Compromiser, War Hawk in 1812"
    },
    "William Lloyd Garrison": {
        "founded": 1831,
        "type": "person",
        "context": "Abolitionist publisher of The Liberator"
    },
    "Nat Turner": {
        "founded": 1831,
        "type": "person",
        "context": "Led slave rebellion in Virginia"
    },
    "Frederick Douglass": {
        "founded": 1838,
        "type": "person",
        "context": "Escaped slave, abolitionist leader"
    },
    "Harriet Tubman": {
        "founded": 1849,
        "type": "person",
        "context": "Underground Railroad conductor"
    },
    "Elizabeth Cady Stanton": {
        "founded": 1848,
        "type": "person",
        "context": "Women's rights activist"
    },
    "Lucretia Mott": {
        "founded": 1848,
        "type": "person",
        "context": "Women's rights and abolitionist leader"
    },
    "Susan B. Anthony": {
        "founded": 1851,
        "type": "person",
        "context": "Women's suffrage leader"
    },
    "Sojourner Truth": {
        "founded": 1851,
        "type": "person",
        "context": "Abolitionist and women's rights activist"
    },
    "Harriet Beecher Stowe": {
        "founded": 1852,
        "type": "person",
        "context": "Author of Uncle Tom's Cabin"
    },
    "Stephen Douglas": {
        "founded": 1854,
        "type": "person",
        "context": "Senator, Kansas-Nebraska Act author"
    },
    "John Brown": {
        "founded": 1856,
        "type": "person",
        "context": "Radical abolitionist, Harpers Ferry raid"
    },
    "Dred Scott": {
        "founded": 1857,
        "type": "person",
        "context": "Enslaved man in landmark Supreme Court case"
    },

    # =========================================================================
    # PEOPLE - CIVIL WAR ERA
    # =========================================================================
    "Abraham Lincoln": {
        "founded": 1860,
        "type": "person",
        "context": "16th President during Civil War"
    },
    "Jefferson Davis": {
        "founded": 1861,
        "type": "person",
        "context": "President of Confederate States"
    },
    "Robert E. Lee": {
        "founded": 1861,
        "type": "person",
        "context": "Confederate general"
    },
    "Ulysses S. Grant": {
        "founded": 1861,
        "type": "person",
        "context": "Union general, 18th President"
    },
    "William Tecumseh Sherman": {
        "founded": 1861,
        "type": "person",
        "context": "Union general, March to the Sea"
    },
    "Stonewall Jackson": {
        "founded": 1861,
        "type": "person",
        "context": "Confederate general"
    },
    "George McClellan": {
        "founded": 1861,
        "type": "person",
        "context": "Union general, organized Army of Potomac"
    },
    "Clara Barton": {
        "founded": 1861,
        "type": "person",
        "context": "Civil War nurse, founded Red Cross"
    },
    "John Wilkes Booth": {
        "founded": 1865,
        "type": "person",
        "context": "Assassinated Abraham Lincoln"
    },

    # =========================================================================
    # PEOPLE - RECONSTRUCTION & GILDED AGE
    # =========================================================================
    "Andrew Johnson": {
        "founded": 1865,
        "type": "person",
        "context": "17th President, Reconstruction leader"
    },
    "Thaddeus Stevens": {
        "founded": 1865,
        "type": "person",
        "context": "Radical Republican leader"
    },
    "Hiram Revels": {
        "founded": 1870,
        "type": "person",
        "context": "First Black US Senator"
    },
    "Rutherford B. Hayes": {
        "founded": 1877,
        "type": "person",
        "context": "19th President, ended Reconstruction"
    },
    "John D. Rockefeller": {
        "founded": 1870,
        "type": "person",
        "context": "Standard Oil founder, industrialist"
    },
    "Andrew Carnegie": {
        "founded": 1873,
        "type": "person",
        "context": "Steel magnate, philanthropist"
    },
    "J.P. Morgan": {
        "founded": 1871,
        "type": "person",
        "context": "Financier and banker"
    },
    "Cornelius Vanderbilt": {
        "founded": 1869,
        "type": "person",
        "context": "Railroad and shipping magnate"
    },
    "Thomas Edison": {
        "founded": 1879,
        "type": "person",
        "context": "Inventor of light bulb and phonograph"
    },
    "Alexander Graham Bell": {
        "founded": 1876,
        "type": "person",
        "context": "Inventor of telephone"
    },
    "Samuel Gompers": {
        "founded": 1886,
        "type": "person",
        "context": "American Federation of Labor founder"
    },
    "Booker T. Washington": {
        "founded": 1881,
        "type": "person",
        "context": "Black educator, Tuskegee Institute founder"
    },
    "W.E.B. Du Bois": {
        "founded": 1903,
        "type": "person",
        "context": "Black scholar, NAACP co-founder"
    },
    "Sitting Bull": {
        "founded": 1876,
        "type": "person",
        "context": "Lakota leader at Little Bighorn"
    },
    "Crazy Horse": {
        "founded": 1876,
        "type": "person",
        "context": "Lakota war leader"
    },
    "George Custer": {
        "founded": 1876,
        "type": "person",
        "context": "US Army officer killed at Little Bighorn"
    },
    "Chief Joseph": {
        "founded": 1877,
        "type": "person",
        "context": "Nez Perce leader"
    },
    "Geronimo": {
        "founded": 1886,
        "type": "person",
        "context": "Apache leader"
    },

    # =========================================================================
    # PEOPLE - PROGRESSIVE ERA
    # =========================================================================
    "Theodore Roosevelt": {
        "founded": 1898,
        "type": "person",
        "context": "Rough Rider, 26th President"
    },
    "William McKinley": {
        "founded": 1896,
        "type": "person",
        "context": "25th President"
    },
    "William Jennings Bryan": {
        "founded": 1896,
        "type": "person",
        "context": "Populist presidential candidate"
    },
    "Ida Tarbell": {
        "founded": 1904,
        "type": "person",
        "context": "Muckraker journalist"
    },
    "Upton Sinclair": {
        "founded": 1906,
        "type": "person",
        "context": "Author of The Jungle"
    },
    "Jane Addams": {
        "founded": 1889,
        "type": "person",
        "context": "Settlement house founder"
    },
    "William Howard Taft": {
        "founded": 1909,
        "type": "person",
        "context": "27th President"
    },
    "Woodrow Wilson": {
        "founded": 1913,
        "type": "person",
        "context": "28th President, WWI leader"
    },
    "Eugene Debs": {
        "founded": 1894,
        "type": "person",
        "context": "Socialist leader"
    },
    "John Pershing": {
        "founded": 1917,
        "type": "person",
        "context": "WWI American Expeditionary Forces commander"
    },

    # =========================================================================
    # INDIGENOUS PEOPLES
    # =========================================================================
    "Aztec": {
        "founded": 1325,
        "ended": 1521,
        "type": "people",
        "context": "Mesoamerican civilization conquered by Cortés"
    },
    "Inca": {
        "founded": 1438,
        "ended": 1572,
        "type": "people",
        "context": "South American empire conquered by Pizarro"
    },
    "Maya": {
        "founded": 2000,  # BCE, but we use positive for simplicity
        "type": "people",
        "context": "Mesoamerican civilization"
    },
    "Taíno": {
        "founded": 1492,
        "type": "people",
        "context": "Indigenous people of Caribbean islands"
    },
    "Timucua": {
        "founded": 1513,
        "type": "people",
        "context": "Indigenous people of Florida"
    },
    "Powhatan": {
        "founded": 1607,
        "type": "people",
        "context": "Indigenous confederacy in Virginia"
    },
    "Wampanoag": {
        "founded": 1620,
        "type": "people",
        "context": "Indigenous people who helped Plymouth"
    },
    "Pequot": {
        "founded": 1636,
        "type": "people",
        "context": "Indigenous people of Connecticut"
    },
    "Iroquois": {
        "founded": 1570,
        "type": "people",
        "context": "Confederacy of Six Nations"
    },
    "Cherokee": {
        "founded": 1540,
        "type": "people",
        "context": "Southeastern indigenous nation"
    },
    "Creek": {
        "founded": 1540,
        "type": "people",
        "context": "Southeastern indigenous confederacy"
    },
    "Seminole": {
        "founded": 1700,
        "type": "people",
        "context": "Florida indigenous nation"
    },
    "Shawnee": {
        "founded": 1670,
        "type": "people",
        "context": "Ohio Valley indigenous nation"
    },
    "Lakota": {
        "founded": 1700,
        "type": "people",
        "context": "Plains indigenous nation (Sioux)"
    },
    "Sioux": {
        "founded": 1700,
        "type": "people",
        "context": "Great Plains indigenous nation"
    },
    "Cheyenne": {
        "founded": 1700,
        "type": "people",
        "context": "Plains indigenous nation"
    },
    "Apache": {
        "founded": 1600,
        "type": "people",
        "context": "Southwestern indigenous nation"
    },
    "Navajo": {
        "founded": 1600,
        "type": "people",
        "context": "Southwestern indigenous nation"
    },
    "Nez Perce": {
        "founded": 1805,
        "type": "people",
        "context": "Pacific Northwest indigenous nation"
    },
    "Comanche": {
        "founded": 1700,
        "type": "people",
        "context": "Southern Plains indigenous nation"
    },

    # =========================================================================
    # DOCUMENTS & PUBLICATIONS
    # =========================================================================
    "Mayflower Compact": {
        "founded": 1620,
        "type": "document",
        "context": "Pilgrim self-governance agreement"
    },
    "Fundamental Orders of Connecticut": {
        "founded": 1639,
        "type": "document",
        "context": "First written constitution in America"
    },
    "Poor Richard's Almanack": {
        "founded": 1732,
        "type": "document",
        "context": "Benjamin Franklin's publication"
    },
    "Common Sense pamphlet": {
        "founded": 1776,
        "type": "document",
        "context": "Thomas Paine's argument for independence"
    },
    "Declaration of Independence document": {
        "founded": 1776,
        "type": "document",
        "context": "Founding document declaring independence"
    },
    "Articles of Confederation document": {
        "founded": 1777,
        "type": "document",
        "context": "First US governing document"
    },
    "Constitution": {
        "founded": 1787,
        "type": "document",
        "context": "Supreme law of United States"
    },
    "Federalist Papers publication": {
        "founded": 1787,
        "type": "document",
        "context": "Essays supporting Constitution ratification"
    },
    "The Liberator": {
        "founded": 1831,
        "type": "document",
        "context": "Garrison's abolitionist newspaper"
    },
    "Declaration of Sentiments": {
        "founded": 1848,
        "type": "document",
        "context": "Seneca Falls women's rights document"
    },
    "Gettysburg Address speech": {
        "founded": 1863,
        "type": "document",
        "context": "Lincoln's dedication speech"
    },

    # =========================================================================
    # CONCEPTS & SYSTEMS
    # =========================================================================
    "encomienda": {
        "founded": 1503,
        "type": "system",
        "context": "Spanish colonial labor system"
    },
    "mercantilism": {
        "founded": 1500,
        "type": "system",
        "context": "Economic system favoring exports"
    },
    "indentured servitude": {
        "founded": 1607,
        "type": "system",
        "context": "Labor system in English colonies"
    },
    "slavery": {
        "founded": 1619,
        "type": "system",
        "context": "Forced labor system"
    },
    "triangular trade": {
        "founded": 1650,
        "type": "system",
        "context": "Atlantic trade network"
    },
    "Middle Passage": {
        "founded": 1619,
        "type": "system",
        "context": "Slave ship voyage across Atlantic"
    },
    "salutary neglect": {
        "founded": 1720,
        "ended": 1763,
        "type": "system",
        "context": "British policy of loose colonial control"
    },
    "virtual representation": {
        "founded": 1765,
        "type": "system",
        "context": "British argument for colonial taxation"
    },
    "popular sovereignty": {
        "founded": 1854,
        "type": "system",
        "context": "Local voters decide slavery question"
    },
    "sharecropping": {
        "founded": 1865,
        "type": "system",
        "context": "Post-Civil War agricultural labor system"
    },
    "Jim Crow": {
        "founded": 1877,
        "type": "system",
        "context": "Racial segregation laws"
    },
    "separate but equal": {
        "founded": 1896,
        "type": "system",
        "context": "Legal doctrine allowing segregation"
    },
    "trust": {
        "founded": 1882,
        "type": "system",
        "context": "Business monopoly arrangement"
    },
    "Social Darwinism": {
        "founded": 1870,
        "type": "system",
        "context": "Application of evolution to society"
    },
    "Gospel of Wealth": {
        "founded": 1889,
        "type": "system",
        "context": "Carnegie's philosophy of philanthropy"
    },

    # =========================================================================
    # COMMODITIES & ECONOMIC TERMS
    # =========================================================================
    "tobacco": {
        "founded": 1612,
        "type": "commodity",
        "context": "Cash crop that saved Virginia"
    },
    "cotton": {
        "founded": 1793,
        "type": "commodity",
        "context": "Major Southern cash crop after cotton gin"
    },
    "cotton gin": {
        "founded": 1793,
        "type": "commodity",
        "context": "Whitney's invention revolutionized cotton"
    },
    "sugar": {
        "founded": 1500,
        "type": "commodity",
        "context": "Caribbean plantation crop"
    },
    "indigo": {
        "founded": 1740,
        "type": "commodity",
        "context": "Blue dye crop in Carolina"
    },
    "rice": {
        "founded": 1690,
        "type": "commodity",
        "context": "Carolina lowcountry crop"
    },
    "whale oil": {
        "founded": 1700,
        "type": "commodity",
        "context": "New England whaling industry"
    },
    "fur trade": {
        "founded": 1608,
        "type": "commodity",
        "context": "Trade in animal pelts"
    },
}

# Technology introduction dates
TECHNOLOGY_DATES = {
    "telegraph": 1844,
    "telephone": 1876,
    "electric": 1879,
    "electricity": 1879,
    "railroad": 1830,
    "automobile": 1886,
    "airplane": 1903,
    "steam engine": 1760,
    "factory": 1760,
}

# Terms to SKIP - these are NOT anachronisms despite pattern matching
# "America" was used as a geographic term since 1507 (Waldseemüller map)
# "Boston" should not match "Boston Tea Party"
# Civil War/Lincoln references in pre-1861 lessons are intentional foreshadowing
SKIP_TERMS = {
    "america",  # Geographic term, valid anytime
    "boston",   # City name, don't confuse with "Boston Tea Party"
    "bostonians",  # People of Boston
    "maryland",  # State name, don't confuse with "McCulloch v. Maryland"
    "sugar",    # Commodity, don't confuse with "Sugar Act"
    "trust",    # General word, don't confuse with antitrust acts
    "new orleans",  # City name, don't confuse with "Battle of New Orleans"
    "great awakening",  # Don't confuse with "Second Great Awakening"
    "andrew johnson",  # Don't confuse with "Impeachment of Andrew Johnson"
    "king philip",  # Spanish King Philip II, don't confuse with "King Philip's War"
    "indigo",   # General commodity term, used in educational context
    "rice",     # General commodity term
    "tobacco",  # General commodity term
    "cotton",   # General commodity term
}

# Multi-word terms that should only match as complete phrases
EXACT_MATCH_TERMS = {
    "king philip's war",  # Don't match "King Philip II"
    "sugar act",
    "battle of new orleans",
    "mcculloch v. maryland",
    "second great awakening",
    "sherman antitrust act",
    "clayton antitrust act",
    "impeachment of andrew johnson",
}

# Terms that are valid as forward-looking narrative (educational foreshadowing)
# These are intentional educational techniques to provide historical context
FORWARD_NARRATIVE_TERMS = {
    "civil war",
    "abraham lincoln",
    "emancipation proclamation",
    "secession",  # Threats of secession discussed before actual secession
    "ulysses s. grant",  # Future leader mentioned in Mexican-American War
    "bill of rights",  # Promised during Constitution ratification
    "thirteenth amendment",  # Foreshadowing abolition of slavery
    "fourteenth amendment",
    "fifteenth amendment",
    "ku klux klan act",  # Congressional response to terrorism
    "plessy v. ferguson",  # Foreshadowing Jim Crow
    "separate but equal",  # Foreshadowing segregation doctrine
    "sixteenth amendment",  # Populist legacy discussion
    "seventeenth amendment",  # Populist legacy discussion
    "treaty of versailles",  # WWI conclusion
    "popular sovereignty",  # Concept discussed in various contexts
}

# Patterns that indicate anachronistic references
ANACHRONISM_PATTERNS = [
    # Technology anachronisms - checked against TECHNOLOGY_DATES
    (r"\b(electricity|electric|telegraph|telephone|railroad|automobile|airplane)\b", "technology"),
    (r"\b(steam engine|factory)\b", "pre_industrial_check"),

    # Government/political anachronisms
    # Note: "Congress" valid from 1765 (Stamp Act Congress), "President" from 1789
    # "America" is NOT flagged - it was a geographic term since 1507
    (r"\b(president)\b", "president_check"),  # Only valid after 1789
    (r"\b(senate)\b", "senate_check"),  # Only valid after 1789
]


def extract_lesson_year(narrator_text: str) -> Optional[int]:
    """Extract the year from the narrator description."""
    # Look for patterns like "1565", "in 1607", etc.
    year_match = re.search(r'\b(1[4-9]\d{2}|20\d{2})\b', narrator_text)
    if year_match:
        return int(year_match.group(1))
    return None


def extract_lesson_year_range(narrator_text: str) -> Tuple[Optional[int], Optional[int]]:
    """Extract year range from narrator (e.g., '1607-1620')."""
    range_match = re.search(r'(\d{4})\s*[-–]\s*(\d{4})', narrator_text)
    if range_match:
        return int(range_match.group(1)), int(range_match.group(2))

    single_year = extract_lesson_year(narrator_text)
    if single_year:
        return single_year, single_year + 5  # Assume 5 year span if single year

    return None, None


def check_timeline_reference(term: str, lesson_year: int) -> Optional[Dict]:
    """Check if a historical term is anachronistic for the given year."""
    term_lower = term.lower()

    for hist_term, data in HISTORICAL_TIMELINE.items():
        if hist_term.lower() in term_lower or term_lower in hist_term.lower():
            founded = data.get("founded", 0)
            ended = data.get("ended")

            # Check if reference is to something that doesn't exist yet
            if lesson_year < founded:
                return {
                    "term": hist_term,
                    "issue": "anachronism",
                    "lesson_year": lesson_year,
                    "term_year": founded,
                    "years_early": founded - lesson_year,
                    "context": data.get("context"),
                    "type": data.get("type")
                }

            # Check if reference is to something that no longer exists
            if ended and lesson_year > ended + 10:  # Allow some buffer
                return {
                    "term": hist_term,
                    "issue": "post_existence",
                    "lesson_year": lesson_year,
                    "ended_year": ended,
                    "years_after": lesson_year - ended,
                    "context": data.get("context"),
                    "type": data.get("type")
                }

    return None


def scan_text_for_issues(text: str, lesson_year: int, end_year: int = None) -> List[Dict]:
    """Scan text for historical accuracy issues.

    Args:
        text: The lesson text to scan
        lesson_year: Start year of the lesson's time period
        end_year: End year of the lesson's time period (for multi-year lessons)
    """
    issues = []
    text_lower = text.lower()

    # Use end_year for validation if provided (allows events within lesson time span)
    effective_year = end_year if end_year else lesson_year

    # Check all known historical terms
    for term in HISTORICAL_TIMELINE.keys():
        term_lower = term.lower()

        # Skip terms that are valid forward-looking narrative
        if term_lower in FORWARD_NARRATIVE_TERMS:
            continue

        # Skip terms that would cause false positives (simple words that are parts of phrases)
        if term_lower in SKIP_TERMS:
            continue

        # For multi-word terms in EXACT_MATCH_TERMS, only match the complete phrase
        if term_lower in EXACT_MATCH_TERMS:
            # Check if the EXACT phrase appears in the text
            exact_pattern = re.compile(r'\b' + re.escape(term) + r'\b', re.IGNORECASE)
            if not exact_pattern.search(text):
                continue  # Exact phrase not found, skip this term
        else:
            # For simple terms, check if there's a multi-word term that contains this term
            # If so, skip the simple term (we'll check the multi-word term separately)
            skip_this_term = False
            for exact_term in EXACT_MATCH_TERMS:
                if term_lower in exact_term and term_lower != exact_term:
                    # This simple term is part of a multi-word term
                    # Only skip if the multi-word term appears in text
                    if exact_term in text_lower:
                        skip_this_term = True
                        break
            if skip_this_term:
                continue

        # Use word boundary matching for exact terms (avoid partial matches)
        pattern = re.compile(r'\b' + re.escape(term) + r'\b', re.IGNORECASE)
        if not pattern.search(text):
            continue

        issue = check_timeline_reference(term, lesson_year)
        if issue:
            # For multi-year lessons, check if term falls within the lesson span
            term_year = issue.get("term_year", 0)
            if end_year and term_year <= end_year:
                continue  # Term is within the lesson's time span

            # Find the context where it appears
            for match in pattern.finditer(text):
                start = max(0, match.start() - 50)
                end = min(len(text), match.end() + 50)
                context = text[start:end].replace('\n', ' ')
                issue["text_context"] = f"...{context}..."
                issues.append(issue.copy())

    # Check for anachronism patterns
    for pattern, issue_type in ANACHRONISM_PATTERNS:
        matches = re.finditer(pattern, text, re.IGNORECASE)
        for match in matches:
            matched_term = match.group().lower()

            # Skip terms that would cause false positives
            if matched_term in SKIP_TERMS:
                continue

            start = max(0, match.start() - 50)
            end = min(len(text), match.end() + 50)
            context = text[start:end].replace('\n', ' ')

            # Technology checks - only flag if lesson is before technology existed
            if issue_type == "technology":
                tech_year = TECHNOLOGY_DATES.get(matched_term, 0)
                if effective_year >= tech_year:
                    continue  # Technology exists in this time period

            # Pre-industrial checks
            if issue_type == "pre_industrial_check" and effective_year >= 1760:
                continue

            # President check - valid from 1789
            if issue_type == "president_check" and effective_year >= 1789:
                continue

            # Senate check - valid from 1789
            if issue_type == "senate_check" and effective_year >= 1789:
                continue

            issues.append({
                "term": match.group(),
                "issue": issue_type,
                "lesson_year": lesson_year,
                "text_context": f"...{context}...",
                "pattern": pattern
            })

    return issues


def parse_lessons_ts(filepath: str) -> List[Dict]:
    """Parse the lessons.ts file and extract lesson data including flashcards and quizzes."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lessons = []

    # Extract each complete lesson block
    # Match from lesson id to the next lesson or end of array
    lesson_block_pattern = re.compile(
        r'\{\s*id:\s*"(lesson-\d+)"(.*?)(?=\{\s*id:\s*"lesson-|\];\s*$)',
        re.DOTALL
    )

    for block_match in lesson_block_pattern.finditer(content):
        lesson_id = block_match.group(1)
        lesson_block = block_match.group(2)

        # Extract title
        title_match = re.search(r'title:\s*"([^"]+)"', lesson_block)
        title = title_match.group(1) if title_match else "Unknown"

        # Extract description
        desc_match = re.search(r'description:\s*"([^"]+)"', lesson_block)
        description = desc_match.group(1) if desc_match else ""

        # Extract narrator
        narrator_match = re.search(r'narrator:\s*"([^"]+)"', lesson_block)
        narrator = narrator_match.group(1) if narrator_match else ""

        # Extract chapters
        chapters_match = re.search(r'chapters:\s*\[(.*?)\],\s*\},?\s*flashcards:', lesson_block, re.DOTALL)
        chapters = []
        if chapters_match:
            chapter_pattern = re.compile(
                r'\{\s*title:\s*"([^"]+)".*?content:\s*`([^`]+)`',
                re.DOTALL
            )
            for ch_match in chapter_pattern.finditer(chapters_match.group(1)):
                chapters.append({
                    "title": ch_match.group(1),
                    "content": ch_match.group(2)
                })

        # Extract flashcards
        flashcards_match = re.search(r'flashcards:\s*\[(.*?)\],\s*quiz:', lesson_block, re.DOTALL)
        flashcards = []
        if flashcards_match:
            # Extract term and definition pairs
            fc_pattern = re.compile(
                r'term:\s*"([^"]+)".*?definition:\s*"([^"]+)"',
                re.DOTALL
            )
            for fc_match in fc_pattern.finditer(flashcards_match.group(1)):
                flashcards.append({
                    "term": fc_match.group(1),
                    "definition": fc_match.group(2)
                })

        # Extract quiz questions
        quiz_match = re.search(r'quiz:\s*\[(.*?)\],?\s*\},?\s*$', lesson_block, re.DOTALL)
        quiz = []
        if quiz_match:
            # Extract question and explanation
            quiz_pattern = re.compile(
                r'question:\s*"([^"]+)".*?explanation:\s*"([^"]+)"',
                re.DOTALL
            )
            for q_match in quiz_pattern.finditer(quiz_match.group(1)):
                quiz.append({
                    "question": q_match.group(1),
                    "explanation": q_match.group(2)
                })

        # Extract year range - try description first (often has better range), then narrator
        start_year, end_year = extract_lesson_year_range(description)
        if not start_year:
            start_year, end_year = extract_lesson_year_range(narrator)

        lessons.append({
            "id": lesson_id,
            "title": title,
            "description": description,
            "narrator": narrator,
            "start_year": start_year,
            "end_year": end_year,
            "chapters": chapters,
            "flashcards": flashcards,
            "quiz": quiz
        })

    return lessons


def scan_all_lessons(lessons_file: str) -> Dict:
    """Scan all lessons for historical accuracy issues including flashcards and quizzes."""
    lessons = parse_lessons_ts(lessons_file)

    results = {
        "scan_date": datetime.now().isoformat(),
        "total_lessons": len(lessons),
        "lessons_with_issues": 0,
        "total_issues": 0,
        "total_flashcards": 0,
        "total_quiz_questions": 0,
        "lessons": []
    }

    for lesson in lessons:
        lesson_result = {
            "id": lesson["id"],
            "title": lesson["title"],
            "narrator": lesson["narrator"],
            "year_range": f"{lesson['start_year']}-{lesson['end_year']}",
            "flashcard_count": len(lesson.get("flashcards", [])),
            "quiz_count": len(lesson.get("quiz", [])),
            "issues": []
        }

        results["total_flashcards"] += lesson_result["flashcard_count"]
        results["total_quiz_questions"] += lesson_result["quiz_count"]

        if not lesson["start_year"]:
            lesson_result["issues"].append({
                "issue": "no_year_detected",
                "message": "Could not extract year from narrator description"
            })
        else:
            # Scan chapters
            for i, chapter in enumerate(lesson["chapters"], 1):
                chapter_issues = scan_text_for_issues(
                    chapter["content"],
                    lesson["start_year"],
                    lesson["end_year"]
                )
                for issue in chapter_issues:
                    issue["location"] = "chapter"
                    issue["chapter"] = i
                    issue["chapter_title"] = chapter["title"]
                    lesson_result["issues"].append(issue)

            # Scan flashcards
            for i, flashcard in enumerate(lesson.get("flashcards", []), 1):
                # Scan term
                term_issues = scan_text_for_issues(
                    flashcard["term"],
                    lesson["start_year"],
                    lesson["end_year"]
                )
                for issue in term_issues:
                    issue["location"] = "flashcard_term"
                    issue["flashcard_num"] = i
                    issue["flashcard_term"] = flashcard["term"]
                    lesson_result["issues"].append(issue)

                # Scan definition
                def_issues = scan_text_for_issues(
                    flashcard["definition"],
                    lesson["start_year"],
                    lesson["end_year"]
                )
                for issue in def_issues:
                    issue["location"] = "flashcard_definition"
                    issue["flashcard_num"] = i
                    issue["flashcard_term"] = flashcard["term"]
                    lesson_result["issues"].append(issue)

            # Scan quiz questions
            for i, quiz_q in enumerate(lesson.get("quiz", []), 1):
                # Scan question
                q_issues = scan_text_for_issues(
                    quiz_q["question"],
                    lesson["start_year"],
                    lesson["end_year"]
                )
                for issue in q_issues:
                    issue["location"] = "quiz_question"
                    issue["quiz_num"] = i
                    issue["quiz_question"] = quiz_q["question"][:50] + "..."
                    lesson_result["issues"].append(issue)

                # Scan explanation
                exp_issues = scan_text_for_issues(
                    quiz_q["explanation"],
                    lesson["start_year"],
                    lesson["end_year"]
                )
                for issue in exp_issues:
                    issue["location"] = "quiz_explanation"
                    issue["quiz_num"] = i
                    issue["quiz_question"] = quiz_q["question"][:50] + "..."
                    lesson_result["issues"].append(issue)

        if lesson_result["issues"]:
            results["lessons_with_issues"] += 1
            results["total_issues"] += len(lesson_result["issues"])

        results["lessons"].append(lesson_result)

    return results


def generate_report(results: Dict, output_path: str):
    """Generate a human-readable report from scan results."""
    report_lines = [
        "=" * 80,
        "HISTORICAL ACCURACY REPORT",
        f"Generated: {results['scan_date']}",
        "=" * 80,
        "",
        f"Total Lessons Scanned: {results['total_lessons']}",
        f"Total Flashcards Scanned: {results.get('total_flashcards', 0)}",
        f"Total Quiz Questions Scanned: {results.get('total_quiz_questions', 0)}",
        f"Lessons with Issues: {results['lessons_with_issues']}",
        f"Total Issues Found: {results['total_issues']}",
        "",
        "=" * 80,
        "DETAILED FINDINGS",
        "=" * 80,
        ""
    ]

    for lesson in results["lessons"]:
        if lesson["issues"]:
            report_lines.append(f"\n{'─' * 60}")
            report_lines.append(f"LESSON: {lesson['id']} - {lesson['title']}")
            report_lines.append(f"Time Period: {lesson['year_range']}")
            report_lines.append(f"Narrator: {lesson['narrator']}")
            report_lines.append(f"Flashcards: {lesson.get('flashcard_count', 0)} | Quiz Questions: {lesson.get('quiz_count', 0)}")
            report_lines.append(f"Issues Found: {len(lesson['issues'])}")
            report_lines.append("─" * 60)

            for i, issue in enumerate(lesson["issues"], 1):
                report_lines.append(f"\n  Issue #{i}:")
                report_lines.append(f"    Type: {issue.get('issue', 'unknown')}")
                report_lines.append(f"    Term: {issue.get('term', 'N/A')}")
                report_lines.append(f"    Location: {issue.get('location', 'chapter')}")

                if issue.get("location") == "flashcard_term" or issue.get("location") == "flashcard_definition":
                    report_lines.append(f"    Flashcard #{issue.get('flashcard_num')}: {issue.get('flashcard_term')}")
                elif issue.get("location") == "quiz_question" or issue.get("location") == "quiz_explanation":
                    report_lines.append(f"    Quiz #{issue.get('quiz_num')}: {issue.get('quiz_question')}")
                elif "chapter" in issue:
                    report_lines.append(f"    Chapter: {issue['chapter']} - {issue.get('chapter_title', '')}")

                if issue.get("issue") == "anachronism":
                    report_lines.append(f"    Problem: Referenced {issue['years_early']} years before it existed")
                    report_lines.append(f"    Lesson Year: {issue['lesson_year']}")
                    report_lines.append(f"    Term Year: {issue['term_year']}")
                    report_lines.append(f"    Context: {issue.get('context', '')}")

                if "text_context" in issue:
                    report_lines.append(f"    Text: {issue['text_context']}")

    # Summary of clean lessons
    clean_lessons = [l for l in results["lessons"] if not l["issues"]]
    if clean_lessons:
        report_lines.append(f"\n{'=' * 80}")
        report_lines.append("LESSONS WITH NO ISSUES DETECTED")
        report_lines.append("=" * 80)
        for lesson in clean_lessons:
            report_lines.append(f"  ✓ {lesson['id']}: {lesson['title']}")

    report_lines.append(f"\n{'=' * 80}")
    report_lines.append("END OF REPORT")
    report_lines.append("=" * 80)

    report_text = "\n".join(report_lines)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(report_text)

    return report_text


def main():
    parser = argparse.ArgumentParser(
        description="Historical Accuracy Checker for History Lessons"
    )
    parser.add_argument(
        '--scan', '-s',
        action='store_true',
        help='Scan all lessons for historical accuracy issues'
    )
    parser.add_argument(
        '--report', '-r',
        action='store_true',
        help='Generate detailed report'
    )
    parser.add_argument(
        '--json', '-j',
        action='store_true',
        help='Output results as JSON'
    )
    parser.add_argument(
        '--output', '-o',
        help='Output file path'
    )

    args = parser.parse_args()

    if not os.path.exists(LESSONS_FILE):
        print(f"Error: Lessons file not found at {LESSONS_FILE}")
        return

    print("=" * 60)
    print("HISTORICAL ACCURACY CHECKER")
    print("=" * 60)
    print(f"\nScanning: {LESSONS_FILE}")
    print("Please wait...")

    results = scan_all_lessons(LESSONS_FILE)

    print(f"\nScan Complete!")
    print(f"  Lessons Scanned: {results['total_lessons']}")
    print(f"  Flashcards Scanned: {results.get('total_flashcards', 0)}")
    print(f"  Quiz Questions Scanned: {results.get('total_quiz_questions', 0)}")
    print(f"  Lessons with Issues: {results['lessons_with_issues']}")
    print(f"  Total Issues Found: {results['total_issues']}")

    if args.json:
        output_path = args.output or os.path.join(REPORTS_DIR, "accuracy_scan.json")
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2)
        print(f"\nJSON results saved to: {output_path}")

    if args.report or not args.json:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_path = args.output or os.path.join(REPORTS_DIR, f"accuracy_report_{timestamp}.txt")
        report = generate_report(results, output_path)
        print(f"\nReport saved to: {output_path}")

        # Print summary to console
        if results["total_issues"] > 0:
            print("\n" + "=" * 60)
            print("ISSUES REQUIRING ATTENTION:")
            print("=" * 60)
            for lesson in results["lessons"]:
                if lesson["issues"]:
                    print(f"\n{lesson['id']}: {lesson['title']}")
                    for issue in lesson["issues"][:3]:  # Show first 3 issues
                        print(f"  - {issue.get('issue')}: {issue.get('term', 'N/A')}")
                    if len(lesson["issues"]) > 3:
                        print(f"  ... and {len(lesson['issues']) - 3} more issues")
        else:
            print("\n[OK] No historical accuracy issues detected!")


if __name__ == "__main__":
    main()
