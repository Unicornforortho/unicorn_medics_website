import { createStyles, Text, Title, Image } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: `calc(${theme.spacing.xl} * 2)`,
    borderRadius: theme.radius.md,
    [theme.fn.smallerThan('xl')]: {
      flexDirection: 'column-reverse',
    },
  },

  image: {
    maxWidth: '30%',
    marginLeft: '20px',
    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  body: {
    paddingRight: `calc(${theme.spacing.xl} * 8)`,

    [theme.fn.smallerThan('sm')]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: 'flex',
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: '100%',
    flex: '1',
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

type EmailBannerProps = {
  imageURL: string;
  text: string;
};

export default function EmailBanner({ imageURL, text }: EmailBannerProps) {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>{text}</Title>
        <Text fz={18} align="justify">
          Dr Vineet Batta, MBBS, MS(Orth), MRCS, Dip SEM, FRCS (Orth), MD (Biomed Eng. Research)UCL
          , works as Senior Clinical Fellow, Orthopaedic & Trauma Surgeon, Luton & Dunstable
          University NHS Hospital Trust, United Kingdom.
        </Text>
        <br />
        <Text fz={18} align="justify">
          He is the principal investigator for the project “Automatic Identification of Orthopaedic
          Implants Using Image Processing and Artificial Intelligence- IMPRO” and is also the
          founder and CEO of Unicorn Medics Ltd.
        </Text>
        <br />
        <Text fz={18} align="justify">
          Dr Vineet has proven interest and experience both as an Orthopedic surgeon and also as an
          avid Researcher. He has numerous publications that showcase his research interest and
          expertise.
        </Text>
        <br />
        <Text fz={18} align="justify">
          He has given guest lectures across the globe and has secured various grants as a part of
          his research. Dr Vineet Batta continuously works with a social vision both as a doctor and
          as a researcher and often encourages others to take up challenging roles and
          responsibilities that benefit the society at large. People who are willing to collaborate
          or share their valuable knowledge or require any general guidance can always feel free to
          contact him.
        </Text>
      </div>
      <Image
        width={250}
        height={250}
        radius={50}
        src={imageURL}
        className={classes.image}
        alt={text}
      />
    </div>
  );
}
