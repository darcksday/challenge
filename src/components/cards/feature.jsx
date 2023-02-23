// @material-tailwind/react components
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";


export const Feature = ({
  icon,
  iconClass = "material-icons",
  title,
  className,
  children,
}) => {
  return (
    <Card
      className={`border border-white/60 bg-white/60 shadow-lg backdrop-blur-2xl backdrop-saturate-200 ${className}`}
    >
      <CardHeader
        shadow={false}
        className="mx-6 -mb-3 grid h-12 w-12 place-items-center rounded-lg bg-[#1A237E]"
      >
        <i className={`${iconClass} relative text-xl text-white`}>{icon}</i>
      </CardHeader>
      <CardBody className="mt-1">
        <Typography variant="h5" className="mb-2 text-[#1A237E]">
          {title}
        </Typography>
        <Typography className=" text-[#1A237E]/60">
          {children}
        </Typography>
      </CardBody>
    </Card>
  );
}
