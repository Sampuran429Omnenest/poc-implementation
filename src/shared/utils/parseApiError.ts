interface ParsedError {
    message: string;
    status: number | null;
}

export const parseApiError = (err: any): ParsedError => {
    const status = err?.response?.status ?? null;
    const message =
        err?.response?.data?.errors?.[0]?.errorMessage ??
        err?.response?.data?.message ??
        err?.message ??
        'Something went wrong.';

    return { message, status };
}