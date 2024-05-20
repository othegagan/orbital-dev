'use client';

//This is use to wrap all the providers

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div>{children}</div>
        </div>
    );
}
