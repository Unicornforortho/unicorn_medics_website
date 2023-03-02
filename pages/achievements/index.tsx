import { Timeline, Text, Center, Box } from '@mantine/core';
import {
  IconCircleNumber1,
  IconCircleNumber2,
  IconCircleNumber3,
  IconCircleNumber4,
} from '@tabler/icons';

function Demo() {
  return (
    <>
      <Text fz={48} align="center">
        News and Achievements
      </Text>
      <br />
      <Text fz={24} align="center">
        2023
      </Text>
      <Center>
        <Box>
          <Timeline active={4} bulletSize={24} lineWidth={2}>
            <Timeline.Item
              bullet={<IconCircleNumber1 />}
              title="Research Paper Accepted and Presented at ICECCT conference"
            >
              <Text color="dimmed" size="sm">
                Paper titled “Automatic Identification of Make and Model of Ankle Implants using
                Artificial Intelligence” got accepted for publication and presented in the ICECCT
                conference.
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconCircleNumber2 />}
              title="Research Paper Accepted for presentation at Efort congress"
            >
              <Text color="dimmed" size="sm">
                Abstract titled “Review of Knee Implant Identification techniques from X ray Images
                using Artificial Intelligence” got accepted for presentation at Efort congress, 2023
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconCircleNumber3 />}
              title="Research Paper Presented at TNOACON"
            >
              <Text color="dimmed" size="sm">
                Abstract titled “Automated Implant Identification using 2D Templates” was presented
                at TNOACON, 2023.
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconCircleNumber4 />}
              title="Research Paper Accepted for presentation at ISBI"
            >
              <Text color="dimmed" size="sm">
                Abstract titled “DATA CONSTRAINED DEEP LEARNING TO IMPROVE SCENARIOS IN REVISION
                ARTHROPLASTY WHERE PREOPERATIVE IDENTIFICATION OF THE MAKE AND MODEL OF THE PRIMARY
                (IN-SITU) IMPLANT IS CRITICAL” accepted for presentation at ISBI, 2023
              </Text>
            </Timeline.Item>
          </Timeline>
        </Box>
      </Center>
    </>
  );
}

export default Demo;
