import { PureComponent } from 'react';
import ImageKit from 'imagekit-javascript';
import { ImageKitContext } from '../IKContext';

interface ImageKitComponentProps {
  urlEndpoint?: string;
}

export class ImageKitComponent extends PureComponent<ImageKitComponentProps> {
  constructor(props: ImageKitComponentProps) {
    super(props);
    this.getContext = this.getContext.bind(this);
  }
  static contextType = ImageKitContext 

  getContext() {
    return this.context || {};
  }

  getIKClient(): ImageKit {
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
