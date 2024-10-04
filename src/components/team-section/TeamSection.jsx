import React from 'react';
import { Box } from '@mui/material';
import TeamMember from '../team-member/TeamMember';

const TeamSection = ({ members, hovered, handleMouseEnter, handleMouseLeave }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-around',
        padding: 2,
        color: "#34405E",
      }}
    >
      {members.map(({ name, image, initials }) => (
        <TeamMember
          key={name}
          name={name}
          image={image}
          initials={initials}
          onMouseEnter={() => handleMouseEnter(name)}
          onMouseLeave={() => handleMouseLeave(name)}
          hovered={hovered[name]}
        />
      ))}
    </Box>
  );
};

export default TeamSection;
