interface ContatinerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContatinerProps> = ({ children }) => {
    return <div className='mx-auto w-full max-w-[1330px]   px-4 py-2 sm:px-6 lg:px-8'>{children}</div>;
};

export default Container;
