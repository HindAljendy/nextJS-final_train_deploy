import Image from 'next/image'
import cloud from '../../public/cloud-hosting.png'

const ImageComponent = () => {
    
    const src_image = "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=";

    return (
        <div>
            <div>
                {/* local image */}
                <Image src={cloud} alt="cloud" width={500} height={500} priority />
            </div>
            <div>
                {/* server image */}
                <Image
                    src={src_image}
                    alt="eye image"
                    width={500}
                    height={500}
                />
            </div>
        </div>
    )
}

export default ImageComponent