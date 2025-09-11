import {
    RouteConfig,
    index,
    route,
    layout,
} from "@react-router/dev/routes";

export default [
    layout("./layouts/base/index.tsx", [
        layout("./layouts/main/index.tsx", [
            index("./routes/Index.tsx"),
        ]),

        route("badge", "./routes/Badge.tsx"),

        // route("test", "./routes/test/Test.tsx"),
    ]),
] satisfies RouteConfig;
