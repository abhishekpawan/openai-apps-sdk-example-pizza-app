# Bajaj Finserv Loans MCP server (Node)

This directory contains a minimal Model Context Protocol (MCP) server implemented with the official TypeScript SDK. The server exposes the full suite of Bajaj Finserv loan product widgets so you can experiment with UI-bearing tools in ChatGPT developer mode.

## Prerequisites

- Node.js 18+
- pnpm, npm, or yarn for dependency management

## Install dependencies

```bash
pnpm install
```

If you prefer npm or yarn, adjust the command accordingly.

## Run the server

```bash
pnpm start
```

The script bootstraps the server over SSE (Server-Sent Events), which makes it compatible with the MCP Inspector as well as ChatGPT connectors. Once running you can list the tools and invoke any of the loan product experiences.

Each tool responds with:

- `content`: a short text confirmation for the loan product widget.
- `structuredContent`: a small JSON payload that echoes the loan product argument, demonstrating how to ship data alongside widgets.
- `_meta.openai/outputTemplate`: metadata that binds the response to the matching Skybridge widget shell.

Feel free to extend the handlers with real data sources, authentication, and persistence.
