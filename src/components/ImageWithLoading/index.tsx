import React, { useState } from 'react';
import { ImageProps, Image, View, ActivityIndicator } from 'react-native';

import colors from '../../assets/colors';

const ImageWithLoading: React.FC<ImageProps> = ({ ...props }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <View
          style={[
            props.style,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}
      <Image
        {...props}
        onLoadEnd={() => setLoading(false)}
        style={props.style}
      />
    </>
  );
};

export default ImageWithLoading;
