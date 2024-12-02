import { AddIcon } from '@chakra-ui/icons';
import { HStack, Image, Text, IconButton } from '@chakra-ui/react';
import trackImage from 'assets/base_track.png';
interface ShoesMakerProps {
  name: string;
  src: string;
}

export const ShoesMaker: React.FC<ShoesMakerProps> = (props) => {
  return (
    <HStack
      spacing="2"
      display="flex"
      alignItems="center"
      boxShadow="md"
      rounded="md"
      bg="white"
    >
      <IconButton aria-label="add Shoes" icon={<AddIcon />} />
      <Image
        borderRadius="full"
        boxSize="40px"
        src={props.src}
        alt={`Shoes name of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
    </HStack>
  );
};

// TODO: セレクトされたらボタンが出現する仕組みにしておく(setShoesTagにセットする)
const ShoesImages = () => {
  const images = [
    {
      id: 1,
      url: trackImage,
      name: 'terser',
    },
    {
      id: 2,
      url: trackImage,
      name: 'nike01',
    },
    {
      id: 3,
      url: trackImage,
      name: 'nike02',
    },
    {
      id: 4,
      url: trackImage,
      name: 'nike03',
    },
  ];

  return (
    <div>
      {images.map((image) => (
        <div key={image.id}>
          <ShoesMaker name={image.name} src={image.url} />
        </div>
      ))}
    </div>
  );
};

export default ShoesImages;
