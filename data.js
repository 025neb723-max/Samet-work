/**
 * Nepal Survey Preferences Data
 * Large-scale survey results showing the top 50 preferred
 * and top 50 not preferable things in Nepal.
 *
 * Each entry contains:
 *   - rank: Position in the list (1-50)
 *   - name: Name of the item/thing
 *   - category: Category grouping
 *   - score: Preference score out of 100
 *   - votes: Total number of survey votes received
 *   - trend: "up", "down", or "stable" compared to last survey
 */

const preferredData = [
  { rank: 1, name: "Mount Everest / Sagarmatha", category: "Natural Landmark", score: 98, votes: 48250, trend: "stable" },
  { rank: 2, name: "Dal Bhat (Lentil & Rice)", category: "Food", score: 97, votes: 47800, trend: "stable" },
  { rank: 3, name: "Pashupatinath Temple", category: "Heritage", score: 96, votes: 46900, trend: "up" },
  { rank: 4, name: "Nepali Hospitality", category: "Culture", score: 95, votes: 46200, trend: "stable" },
  { rank: 5, name: "Pokhara Lakeside", category: "Tourism", score: 95, votes: 45800, trend: "up" },
  { rank: 6, name: "Annapurna Circuit Trek", category: "Adventure", score: 94, votes: 45100, trend: "up" },
  { rank: 7, name: "Momo (Dumplings)", category: "Food", score: 94, votes: 44800, trend: "up" },
  { rank: 8, name: "Lumbini (Birthplace of Buddha)", category: "Heritage", score: 93, votes: 44200, trend: "stable" },
  { rank: 9, name: "Dashain Festival", category: "Festival", score: 93, votes: 43900, trend: "stable" },
  { rank: 10, name: "Chitwan National Park", category: "Nature", score: 92, votes: 43500, trend: "up" },
  { rank: 11, name: "Nepali Tea (Chiya)", category: "Food", score: 92, votes: 43100, trend: "up" },
  { rank: 12, name: "Boudhanath Stupa", category: "Heritage", score: 91, votes: 42800, trend: "stable" },
  { rank: 13, name: "Himalayan Views", category: "Natural Landmark", score: 91, votes: 42400, trend: "stable" },
  { rank: 14, name: "Newari Architecture", category: "Culture", score: 90, votes: 41800, trend: "up" },
  { rank: 15, name: "Tihar Festival", category: "Festival", score: 90, votes: 41500, trend: "stable" },
  { rank: 16, name: "Swayambhunath (Monkey Temple)", category: "Heritage", score: 89, votes: 41000, trend: "stable" },
  { rank: 17, name: "Phewa Lake Boating", category: "Tourism", score: 89, votes: 40600, trend: "up" },
  { rank: 18, name: "Nepali Handicrafts", category: "Culture", score: 88, votes: 40200, trend: "up" },
  { rank: 19, name: "Thamel (Tourist Hub)", category: "Tourism", score: 88, votes: 39800, trend: "stable" },
  { rank: 20, name: "Everest Base Camp Trek", category: "Adventure", score: 87, votes: 39400, trend: "up" },
  { rank: 21, name: "Sel Roti (Rice Bread)", category: "Food", score: 87, votes: 39000, trend: "up" },
  { rank: 22, name: "Bhaktapur Durbar Square", category: "Heritage", score: 86, votes: 38600, trend: "stable" },
  { rank: 23, name: "Nepali Music & Dance", category: "Culture", score: 86, votes: 38200, trend: "up" },
  { rank: 24, name: "Paragliding in Pokhara", category: "Adventure", score: 85, votes: 37800, trend: "up" },
  { rank: 25, name: "Thakali Cuisine", category: "Food", score: 85, votes: 37400, trend: "up" },
  { rank: 26, name: "Patan Durbar Square", category: "Heritage", score: 84, votes: 37000, trend: "stable" },
  { rank: 27, name: "Kathmandu Durbar Square", category: "Heritage", score: 84, votes: 36600, trend: "stable" },
  { rank: 28, name: "White Water Rafting", category: "Adventure", score: 83, votes: 36200, trend: "up" },
  { rank: 29, name: "Nepali Thangka Paintings", category: "Culture", score: 83, votes: 35800, trend: "stable" },
  { rank: 30, name: "Langtang Valley Trek", category: "Adventure", score: 82, votes: 35400, trend: "up" },
  { rank: 31, name: "Chhyang (Rice Beer)", category: "Food", score: 82, votes: 35000, trend: "stable" },
  { rank: 32, name: "Holi Festival (Fagu Purnima)", category: "Festival", score: 81, votes: 34600, trend: "stable" },
  { rank: 33, name: "Rara Lake", category: "Nature", score: 81, votes: 34200, trend: "up" },
  { rank: 34, name: "Bungee Jumping (Bhote Koshi)", category: "Adventure", score: 80, votes: 33800, trend: "up" },
  { rank: 35, name: "Nepali Dhaka Fabric", category: "Culture", score: 80, votes: 33400, trend: "stable" },
  { rank: 36, name: "Chatamari (Newari Pizza)", category: "Food", score: 79, votes: 33000, trend: "up" },
  { rank: 37, name: "Bardiya National Park", category: "Nature", score: 79, votes: 32600, trend: "up" },
  { rank: 38, name: "Indra Jatra Festival", category: "Festival", score: 78, votes: 32200, trend: "stable" },
  { rank: 39, name: "Janakpur Dham", category: "Heritage", score: 78, votes: 31800, trend: "stable" },
  { rank: 40, name: "Mountain Flight", category: "Tourism", score: 77, votes: 31400, trend: "up" },
  { rank: 41, name: "Yomari (Sweet Dumpling)", category: "Food", score: 77, votes: 31000, trend: "up" },
  { rank: 42, name: "Upper Mustang Trek", category: "Adventure", score: 76, votes: 30600, trend: "up" },
  { rank: 43, name: "Manakamana Temple Cable Car", category: "Tourism", score: 76, votes: 30200, trend: "stable" },
  { rank: 44, name: "Nepali Singing Bowls", category: "Culture", score: 75, votes: 29800, trend: "up" },
  { rank: 45, name: "Gosaikunda Lake", category: "Nature", score: 75, votes: 29400, trend: "up" },
  { rank: 46, name: "Bisket Jatra (New Year Festival)", category: "Festival", score: 74, votes: 29000, trend: "stable" },
  { rank: 47, name: "Gundruk (Fermented Greens)", category: "Food", score: 74, votes: 28600, trend: "stable" },
  { rank: 48, name: "Bandipur Village", category: "Tourism", score: 73, votes: 28200, trend: "up" },
  { rank: 49, name: "Khukuri (Gurkha Knife)", category: "Culture", score: 73, votes: 27800, trend: "stable" },
  { rank: 50, name: "Tilicho Lake", category: "Nature", score: 72, votes: 27400, trend: "up" }
];

const notPreferableData = [
  { rank: 1, name: "Road Conditions & Potholes", category: "Infrastructure", score: 96, votes: 47500, trend: "stable" },
  { rank: 2, name: "Load Shedding (Power Cuts)", category: "Infrastructure", score: 95, votes: 46800, trend: "down" },
  { rank: 3, name: "Air Pollution in Kathmandu", category: "Environment", score: 94, votes: 46200, trend: "up" },
  { rank: 4, name: "Traffic Congestion", category: "Infrastructure", score: 93, votes: 45500, trend: "up" },
  { rank: 5, name: "Corruption in Government", category: "Governance", score: 93, votes: 44900, trend: "stable" },
  { rank: 6, name: "Waste Management Issues", category: "Environment", score: 92, votes: 44200, trend: "up" },
  { rank: 7, name: "Slow Internet Speed", category: "Technology", score: 91, votes: 43600, trend: "down" },
  { rank: 8, name: "Political Instability", category: "Governance", score: 90, votes: 43000, trend: "stable" },
  { rank: 9, name: "Unemployment Rate", category: "Economy", score: 90, votes: 42400, trend: "up" },
  { rank: 10, name: "Lack of Public Transport", category: "Infrastructure", score: 89, votes: 41800, trend: "stable" },
  { rank: 11, name: "Water Supply Shortage", category: "Infrastructure", score: 88, votes: 41200, trend: "stable" },
  { rank: 12, name: "Earthquake Vulnerability", category: "Disaster", score: 88, votes: 40600, trend: "stable" },
  { rank: 13, name: "Brain Drain / Youth Migration", category: "Economy", score: 87, votes: 40000, trend: "up" },
  { rank: 14, name: "Bureaucratic Red Tape", category: "Governance", score: 86, votes: 39400, trend: "stable" },
  { rank: 15, name: "Noise Pollution", category: "Environment", score: 86, votes: 38800, trend: "up" },
  { rank: 16, name: "Overcrowded Public Buses", category: "Infrastructure", score: 85, votes: 38200, trend: "stable" },
  { rank: 17, name: "Lack of Healthcare Access", category: "Health", score: 84, votes: 37600, trend: "stable" },
  { rank: 18, name: "Fuel Price Hikes", category: "Economy", score: 84, votes: 37000, trend: "up" },
  { rank: 19, name: "River Pollution", category: "Environment", score: 83, votes: 36400, trend: "up" },
  { rank: 20, name: "Frequent Strikes (Bandh)", category: "Governance", score: 82, votes: 35800, trend: "down" },
  { rank: 21, name: "Landslides During Monsoon", category: "Disaster", score: 82, votes: 35200, trend: "stable" },
  { rank: 22, name: "Gender Inequality", category: "Society", score: 81, votes: 34600, trend: "down" },
  { rank: 23, name: "Poor Quality Education System", category: "Education", score: 80, votes: 34000, trend: "stable" },
  { rank: 24, name: "Stray Dog Problem", category: "Society", score: 80, votes: 33400, trend: "up" },
  { rank: 25, name: "Construction Dust", category: "Environment", score: 79, votes: 32800, trend: "up" },
  { rank: 26, name: "Lack of Sidewalks", category: "Infrastructure", score: 78, votes: 32200, trend: "stable" },
  { rank: 27, name: "Overpriced Real Estate", category: "Economy", score: 78, votes: 31600, trend: "up" },
  { rank: 28, name: "Poor Drainage System", category: "Infrastructure", score: 77, votes: 31000, trend: "stable" },
  { rank: 29, name: "Food Adulteration", category: "Health", score: 76, votes: 30400, trend: "stable" },
  { rank: 30, name: "Deforestation", category: "Environment", score: 76, votes: 29800, trend: "down" },
  { rank: 31, name: "Flooding in Terai", category: "Disaster", score: 75, votes: 29200, trend: "stable" },
  { rank: 32, name: "Caste Discrimination", category: "Society", score: 74, votes: 28600, trend: "down" },
  { rank: 33, name: "Lack of Sports Infrastructure", category: "Infrastructure", score: 74, votes: 28000, trend: "stable" },
  { rank: 34, name: "Child Labor Issues", category: "Society", score: 73, votes: 27400, trend: "down" },
  { rank: 35, name: "Slow Government Services", category: "Governance", score: 72, votes: 26800, trend: "stable" },
  { rank: 36, name: "Unregulated Construction", category: "Infrastructure", score: 72, votes: 26200, trend: "up" },
  { rank: 37, name: "Poor Waste Recycling", category: "Environment", score: 71, votes: 25600, trend: "stable" },
  { rank: 38, name: "Lack of Fire Safety Measures", category: "Disaster", score: 70, votes: 25000, trend: "stable" },
  { rank: 39, name: "Inflation & Rising Prices", category: "Economy", score: 70, votes: 24400, trend: "up" },
  { rank: 40, name: "Encroachment of Public Spaces", category: "Society", score: 69, votes: 23800, trend: "stable" },
  { rank: 41, name: "Unreliable Flight Schedules", category: "Infrastructure", score: 68, votes: 23200, trend: "stable" },
  { rank: 42, name: "Lack of Disability Access", category: "Society", score: 68, votes: 22600, trend: "stable" },
  { rank: 43, name: "Seasonal Dust Storms", category: "Environment", score: 67, votes: 22000, trend: "stable" },
  { rank: 44, name: "Poor Street Lighting", category: "Infrastructure", score: 66, votes: 21400, trend: "down" },
  { rank: 45, name: "Dowry System", category: "Society", score: 66, votes: 20800, trend: "down" },
  { rank: 46, name: "Lack of Mental Health Services", category: "Health", score: 65, votes: 20200, trend: "up" },
  { rank: 47, name: "Unplanned Urbanization", category: "Infrastructure", score: 64, votes: 19600, trend: "up" },
  { rank: 48, name: "Noise from Honking Vehicles", category: "Environment", score: 64, votes: 19000, trend: "stable" },
  { rank: 49, name: "Limited Digital Payment Options", category: "Technology", score: 63, votes: 18400, trend: "down" },
  { rank: 50, name: "Illegal Sand Mining", category: "Environment", score: 62, votes: 17800, trend: "stable" }
];

/**
 * Summary statistics for the survey
 */
const surveyStats = {
  totalRespondents: 52480,
  surveyPeriod: "Jan 2025 - Mar 2026",
  regionsCount: 77,
  provincesCount: 7,
  lastUpdated: "2026-03-15",
  marginOfError: "±1.2%"
};
