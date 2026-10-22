const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { z } = require('zod');
const Artifact = require('../models/Artifact');
const HeritageSite = require('../models/HeritageSite');

const escapeRegex = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ok = (data) => ({ content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] });
const fail = (error) => ({
  isError: true,
  content: [{ type: 'text', text: `Error: ${error.message}` }],
});
const safe = (fn) => async (args) => {
  try {
    return ok(await fn(args));
  } catch (error) {
    return fail(error);
  }
};

// A new McpServer per request (stateless) -> works fine on Render
const createMcpServer = () => {
  const server = new McpServer({ name: 'digital-museum-mcp', version: '1.0.0' });

  // ---------- ARTIFACTS ----------
  server.registerTool(
    'search_artifacts',
    {
      description: 'Search museum artifacts by keyword and/or category. Returns up to `limit` results.',
      inputSchema: {
        search: z.string().optional().describe('Keyword matched against title, description, origin, tags...'),
        category: z.string().optional(),
        limit: z.number().int().min(1).max(50).default(10),
      },
    },
    safe(async ({ search, category, limit }) => {
      const query = {};
      if (search) {
        const rx = new RegExp(escapeRegex(search.trim()), 'i');
        query.$or = [{ title: rx }, { description: rx }, { category: rx }, { origin: rx }, { period: rx }, { tags: rx }];
      }
      if (category) query.category = new RegExp(`^${escapeRegex(category.trim())}$`, 'i');
      return Artifact.find(query).sort({ createdAt: -1 }).limit(limit);
    }),
  );

  server.registerTool(
    'get_artifact',
    { description: 'Get one artifact by its MongoDB id.', inputSchema: { id: z.string() } },
    safe(async ({ id }) => (await Artifact.findById(id)) || { message: 'Artifact not found' }),
  );

  server.registerTool(
    'create_artifact',
    {
      description: 'Add a new artifact to the museum.',
      inputSchema: {
        title: z.string().min(2).max(150),
        description: z.string().min(10).max(5000),
        category: z.string().max(100),
        period: z.string().optional(),
        origin: z.string().optional(),
        material: z.string().optional(),
        museumLocation: z.string().optional(),
        tags: z.array(z.string()).optional(),
      },
    },
    safe(async (args) => Artifact.create(args)),
  );

  server.registerTool(
    'update_artifact',
    {
      description: 'Update fields of an existing artifact.',
      inputSchema: {
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        period: z.string().optional(),
        origin: z.string().optional(),
        material: z.string().optional(),
        museumLocation: z.string().optional(),
        preservationStatus: z.string().optional(),
        tags: z.array(z.string()).optional(),
      },
    },
    safe(async ({ id, ...updates }) =>
      (await Artifact.findByIdAndUpdate(id, updates, { new: true, runValidators: true })) || { message: 'Artifact not found' },
    ),
  );

  server.registerTool(
    'delete_artifact',
    { description: 'Delete an artifact by id.', inputSchema: { id: z.string() } },
    safe(async ({ id }) => ((await Artifact.findByIdAndDelete(id)) ? { deleted: true } : { message: 'Artifact not found' })),
  );

  // ---------- HERITAGE SITES ----------
  server.registerTool(
    'search_heritage_sites',
    {
      description: 'Search heritage sites by keyword, state or site type.',
      inputSchema: {
        search: z.string().optional(),
        state: z.string().optional(),
        siteType: z.string().optional(),
        limit: z.number().int().min(1).max(50).default(10),
      },
    },
    safe(async ({ search, state, siteType, limit }) => {
      const query = {};
      if (search) {
        const rx = new RegExp(escapeRegex(search.trim()), 'i');
        query.$or = [{ name: rx }, { description: rx }, { location: rx }, { tags: rx }];
      }
      if (state) query.state = new RegExp(`^${escapeRegex(state.trim())}$`, 'i');
      if (siteType) query.siteType = new RegExp(`^${escapeRegex(siteType.trim())}$`, 'i');
      return HeritageSite.find(query).sort({ createdAt: -1 }).limit(limit);
    }),
  );

  server.registerTool(
    'get_heritage_site',
    { description: 'Get one heritage site by id.', inputSchema: { id: z.string() } },
    safe(async ({ id }) => (await HeritageSite.findById(id)) || { message: 'Heritage site not found' }),
  );

  server.registerTool(
    'create_heritage_site',
    {
      description: 'Add a new heritage site.',
      inputSchema: {
        name: z.string(),
        description: z.string(),
        location: z.string(),
        state: z.string().optional(),
        historicalPeriod: z.string().optional(),
        siteType: z.string().optional(),
        establishedYear: z.number().int().optional(),
        tags: z.array(z.string()).optional(),
      },
    },
    safe(async (args) => HeritageSite.create(args)),
  );

  server.registerTool(
    'delete_heritage_site',
    { description: 'Delete a heritage site by id.', inputSchema: { id: z.string() } },
    safe(async ({ id }) => ((await HeritageSite.findByIdAndDelete(id)) ? { deleted: true } : { message: 'Heritage site not found' })),
  );

  return server;
};

module.exports = createMcpServer;
