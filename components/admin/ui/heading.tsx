interface HaeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HaeadingProps> = ({ title, description }) => {
  return (
    <div className="my-4">
      <h2 className="text-2xl md:text-4xl font-bold leading-snug text-foreground">
        {title}
      </h2>
      <p className="text-small text-foreground">{description}</p>
    </div>
  );
};
