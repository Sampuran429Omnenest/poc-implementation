// design flow for now :
// normal page having both the chart on right and list with search on the left and above them recommened,nifty 50 ....
// when searching a particular stock all equities for a symbol
// on the right of them + will create the watchlist and settings will show 
// Show holdings
// Show tags
// Recommended
// 16 scrips
// Nifty 50
// 16 scrips
// Best of BSE
// 16 scrips
// Nest 50
// 16 scrips
// hovering on a particular stock:opening buy sell,market depth,chart,delete and 
// Create alert
// Fundamentals
// Option chain
// Add blank row above
// Add blank row below
// Remove from watchlist


// Figma Component,UI Action / Interaction,API Endpoint to Call
// Top Navigation Tabs,"Switching between ""Nifty 50"", ""Best of BSE"", etc.",v1/api/watchlist/scrips/list (with a hardcoded watchlistId for each tab).
// Top Bar Labels,"Showing ""16 scrips"" under each tab name.",Calculated from the count or length of the array in the /scrips/list response.
// Global Search Input,"Typing a symbol (e.g., ""BHEL"") in the top-left box.",v1/api/global-search/search?symbol={query}&top=20
// Search Result Action,"Clicking the ""+"" icon next to a search result.","v1/api/watchlist/multi-adg with action: ""ADD""."
// Left Sidebar (List),Rendering the rows of stocks with LTP and % Change.,v1/api/watchlist/scrips/list (provides lastTradedPrice and previousClosePrice).
// Hover Menu: Buy/Sell,"Clicking ""Buy"" or ""Sell"" on a specific row.",Requires an Order API (typically /v1/api/orders/place).
// Hover Menu: Depth,"Viewing the ""Market Depth"" (Bid/Ask).","v1/api/watchlist/scrips/list (provides bidRate, askRate, bidQty, askQty)."
// Hover Menu: Chart,"Clicking the ""Chart"" icon or clicking the row.",v1/middleware-bff/stocks/intraday-aggr-data (updates the right-side component).
// Hover Menu: Options,"Clicking ""Option Chain"".","v1/api/stocks/derivative-contracts with instrumentType: ""OPT""."
// Hover Menu: Remove,"Clicking ""Remove from watchlist"".","v1/api/watchlist/multi-adg with action: ""DELETE""."
// Right Side Panel,Rendering the 1-minute price candles.,v1/middleware-bff/stocks/intraday-aggr-data with intervalTime: 1.
// Watchlist Settings,Renaming the list or changing view settings.,v1/api/watchlist/edit (to change the name).



// The "Search to Watchlist" logic
// When a user searches for a stock and hits "+", you are actually performing a two-step dance:

// POST to /multi-adg to tell the server to save the stock.

// RE-FETCH /scrips/list to update your UI so the new stock immediately appears in the sidebar.

// 3. The "Blank Row" logic (Figma Detail)
// You mentioned "Add blank row above/below."

// Note: This is almost always a Local UI State only. You don't send a blank row to the server.

// Implementation: In your React/Vue state, your watchlistItems array would look like this:
// [ {scripToken: "2885", ...}, {isBlank: true}, {scripToken: "1270", ...} ]
// When your code sees {isBlank: true}, it renders an empty <div> instead of a stock row.

// 4. The "Derivative" logic
// When the user clicks "Option Chain" from the hover menu:

// Take the symbolName (e.g., "BHEL") from the current row.

// Call v1/api/stocks/derivative-contracts with FUT or OPT.

// Display the results in a modal or overlay.

// Refining your Search Flow
// In your "refined" flow, you mentioned "when searching a particular stock all equities for a symbol."

// The API to focus on: /v1/api/global-search/search.

// Pro-tip: Use the exchangeSegment filter in the search response to separate "NSE Equity" from "BSE Equity" so the user can choose exactly which exchange they want to add to their list.