export type WorksQuery = {
    works: {
        area: string | undefined;
        description: string | undefined;
        duration: string | undefined;
        id: string;
        location: string | undefined;
        status: string | undefined;
        title: string | undefined;
        artwork: {
            name: string | undefined;
            url: string | undefined;
        }
        category: {
            id: string | undefined;
            name: string | undefined;
        }
        coverImage: {
            name: string | undefined;
            url: string | undefined;
        }
    }
};
