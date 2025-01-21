import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


export const PickupIcon = () => {
  return (
    <span
      style={{
        position: 'relative',
        top: 6,
        left: -1,
      }}
    >
      <StoreMallDirectoryOutlinedIcon
        sx={{
          position: "relative",
          top: 0,
          left: 0,
          fontSize: "1.5rem",
          color: "var(--primary-color)"
        }}
      />

      <DirectionsWalkOutlinedIcon
        sx={{
          position: "absolute",
          top: "12px",
          left: "18px",
          transform: "rotateY(180deg)",
          fontSize: ".75rem",
          color: "var(--primary-color)"
        }}
      />
    </span>
  );
};

export const EditionIcon = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <span
        style={{
          position: 'relative',
          top: 6,
          left: -1,
        }}
      >
        <ContentPasteOutlinedIcon
          sx={{
            position: "relative",
            top: 0,
            left: 0,
            fontSize: "1.5rem",
            color: "var(--primary-color)"
          }}
        />

        <EditOutlinedIcon
          sx={{
            position: "absolute",
            top: "8px",
            left: "8px",
            fontSize: ".75rem",
            color: "var(--primary-color)"
          }}
        />
      </span>
    </div>
  );
};
