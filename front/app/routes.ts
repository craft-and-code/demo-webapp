import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("pdl/:pdl", "routes/pdl-detail.tsx")
] satisfies RouteConfig;
