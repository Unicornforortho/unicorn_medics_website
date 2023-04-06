import { createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    width: 'fit-content',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    padding: 15,
    margin: '20px 0px',
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  title: {
    color: theme.white,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    fontSize: 32,
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: 5,
  },

  stat: {
    '& + &': {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `1 solid ${theme.colors[theme.primaryColor][0]}`,

      [theme.fn.smallerThan('sm')]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `1 solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },
}));

interface StatsGroupProps {
  statistics: { title: string; stats: number; description: string }[];
}

export default function StatsGroup({ statistics }: StatsGroupProps) {
  const { classes } = useStyles();
  const stats = statistics.map((stat) =>
    stat.stats === -1 ? (
      <div key={stat.title} className={classes.stat}>
        <Text className={classes.title}>Please wait while we fetch the latest data</Text>
      </div>
    ) : (
      <div key={stat.title} className={classes.stat}>
        <Text className={classes.count}>{stat.stats}</Text>
        <Text className={classes.title}>{stat.title}</Text>
        <Text className={classes.description}>{stat.description}</Text>
      </div>
    ),
  );
  return <div className={classes.root}>{stats}</div>;
}
