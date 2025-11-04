# Loan Details Widget

A detailed loan information widget that displays comprehensive information about a specific loan product.

## Overview

This widget shows detailed information for a particular loan type including:
- Loan details (interest rate, amount, tenure, processing fee)
- Key features and benefits
- Eligibility criteria
- Required documents
- Direct apply button

## Structure

```
src/loan-details/
├── index.jsx            # Main component entry point
├── LoanDetailCard.jsx   # Loan detail card component
└── loans-info.json      # Loan data for all loan types
```

## Usage

The widget accepts a `loanProduct` parameter to determine which loan type to display.

### Available Loan Types

- `personal-loan` - Personal Loan
- `gold-loan` - Gold Loan
- `home-loan` - Home Loan
- `business-loan` - Business Loan
- `car-loan` - Car Loan
- `loan-against-property` - Loan Against Property

### Example

When calling the MCP tool, pass the loan type:

```json
{
  "loanProduct": "personal-loan"
}
```

## Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Comprehensive Information**: Shows all relevant loan details
- **Visual Hierarchy**: Uses cards and sections for easy scanning
- **Direct CTA**: Apply button with direct link to application page
- **Brand Colors**: Uses Bajaj Finserv brand colors (#002953 and #ff8900)

## Data Structure

Each loan type in `loans-info.json` contains:

```json
{
  "id": "loan-id",
  "name": "Loan Name",
  "tagline": "Short description",
  "description": "Detailed description",
  "interestRate": "X% p.a.",
  "minRate": "X.XX",
  "maxRate": "XX",
  "loanAmount": "₹X - ₹X",
  "tenure": "X - XX months",
  "processingFee": "Up to X% + GST",
  "thumbnail": "image-url",
  "features": ["feature1", "feature2", ...],
  "eligibility": ["criterion1", "criterion2", ...],
  "documents": ["doc1", "doc2", ...],
  "applyUrl": "application-url"
}
```

## Development

To add a new loan type:

1. Add the loan data to `loans-info.json` under `loanTypes`
2. Follow the existing data structure
3. Ensure all required fields are populated
4. Test with the widget by passing the new loan ID

## Building

The widget is built as part of the main build process:

```bash
pnpm run build
```

This generates:
- `assets/loan-details.html`
- `assets/loan-details.js`
- `assets/loan-details.css`

## MCP Server Integration

The widget is registered in the MCP server at `pizzaz_server_node/src/server.ts`:

```typescript
{
  id: "loan-details",
  title: "Show Loan Details",
  templateUri: "ui://widget/loan-details.html",
  invoking: "Loading loan details",
  invoked: "Displayed loan details",
  html: readWidgetHtml("loan-details"),
  responseText: "Rendered detailed loan information!",
}
```
