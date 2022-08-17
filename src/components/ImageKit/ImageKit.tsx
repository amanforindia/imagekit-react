import { PureComponent } from 'react';
import ImageKit from 'imagekit-javascript';
import { ImageKitContextType } from '../../interfaces/IKContextType';

type IKProps = ImageKitContextType & {
  className?: string
  loading?: string,
  alt?: string,
  inputRef?: React.LegacyRef<HTMLInputElement>,
  width?: string,
  height?: string,
  controls?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  enabledGif?: boolean,
  thumbnailTransformation?: any,
  onThumbnailLoad?: (thumbnail: string) => void
}

export class ImageKitComponent extends PureComponent<IKProps, any> {
  constructor(props: IKProps, context: ImageKitContextType) {
    super(props, context);
    this.getContext = this.getContext.bind(this);
  }

  getContext() {
    return this.context || {};
  }

  getIKClient() {
    const contextOptions = this.getContext();
    if (contextOptions.ikClient) {
      return contextOptions.ikClient;
    }
    let { urlEndpoint } = this.props;
    urlEndpoint = urlEndpoint || contextOptions.urlEndpoint;

    if(!urlEndpoint || urlEndpoint.trim() === "") {
      throw new Error("Missing urlEndpoint during initialization");
    }
    const ikClient = new ImageKit({
      urlEndpoint: urlEndpoint
    });
    return ikClient;
  }
}