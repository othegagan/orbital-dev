const SectionTitle = ({
    title,
    paragraph,
    paragraph2,
    width = '570px',
    center,
    mb = '100px',
    mb2 = '100px',
}: {
    title: string;
    paragraph?: string;
    paragraph2?: string;
    width?: string;
    center?: boolean;
    mb?: string;
    mb2?: string;
}) => {
    return (
        <>
            <div className={`w-full ${center ? 'mx-auto text-center' : ''}`} style={{ maxWidth: width, marginBottom: mb }}>
                <h2 className='mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[40px]'>{title}</h2>
                <p className='text-body-color md:text-md text-base font-bold !leading-relaxed'>{paragraph}</p>
                <p className='font-weight: 300; text-body-color md:text-md text-base !leading-relaxed text-[#000000]'>{paragraph2}</p>
            </div>
        </>
    );
};

export default SectionTitle;
