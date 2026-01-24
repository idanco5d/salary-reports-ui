import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import * as React from "react";
import {render} from "@testing-library/react";

export const renderWithQueryClient = (component: React.ReactElement) => {
    return render(component, { wrapper });
}

const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}