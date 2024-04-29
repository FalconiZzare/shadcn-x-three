import { useState } from "react";
import { ExternalLink, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { royal, uploadImage } from "@/api/image.js";
import { useMutation } from "@tanstack/react-query";
import { Icons } from "@/Icons/Icons.jsx";
import { Label } from "@/components/ui/label.jsx";
import fileTypeChecker from "file-type-checker";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils.js";

const Packages = () => {
  const [image, setImage] = useState(null);
  const [searchUrl, setSearchUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleClearFile = () => {
    setImage(null);
    const imageInput = document.getElementById("picture");
    if (imageInput) {
      imageInput.value = "";
    }
  };

  const { data, isPending, isSuccess, mutate } = useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: () => {
      if (image) {
        const formData = new FormData();

        formData.append("image", image);

        return uploadImage(formData);
      } else {
        toast("No image selected!", {
          icon: <AlertTriangle className={"size-5 text-red-500"} />
        });
      }
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      toast("Image uploaded successfully!", {
        icon: <CheckCircle className={"size-5 text-green-500"} />
      });

      handleClearFile();
    }
  });

  const fileTypeCheck = (file) => {
    try {
      const reader = new FileReader();
      const types = ["png", "jpeg", "gif"];

      reader.onload = () => {
        const isImage = fileTypeChecker.validateFileType(reader.result, types);
        if (isImage) {
          setImage(file);
        } else {
          toast("Invalid file type!", {
            icon: <AlertTriangle className={"size-5 text-red-500"} />
          });
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFilePaste = (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    const blob = items[0].getAsFile() || items[1].getAsFile();

    fileTypeCheck(blob);
  };

  const handlePasteClick = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();

      const blob = await clipboardItems[0].getType(
        clipboardItems[0].types[1] || clipboardItems[0].types[0]
      );

      fileTypeCheck(blob);
    } catch (err) {
      console.log(err.name, err.message);
    }
  };

  const handleSelectFile = async (e) => {
    fileTypeCheck(e.target.files[0]);
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    await fileTypeCheck(file);
    setIsDragging(false);
  };

  const handleDragover = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const { data: royalData, isPending: royalPending, mutate: royalFetch } = useMutation({
    mutationKey: ["royalFetch"],
    mutationFn: () => {
      return royal()
    },
    onError: (error) => {
      console.log(error)
      toast(error.message, {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });
    }
  })

  return (
    <div className={"flex h-full w-full flex-col items-center justify-center gap-8"}>
      <Button onClick={() => royalFetch()}>
        Royal Fetch
      </Button>
      <p>{royalPending ? "Loading..." : royalData ? royalData?.data.greet : "No Data"}</p>
      <div
        className={cn(
          "relative h-[380px] w-[550px] overflow-hidden rounded-2xl py-2",
          image && "border border-dashed border-foreground py-0"
        )}
      >
        {image ? (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              className={"pointer-events-none h-full w-full object-cover"}
            />
            <XCircle
              className={
                "absolute right-2 top-2 cursor-pointer rounded-full bg-background text-foreground drop-shadow"
              }
              onClick={handleClearFile}
            />
          </>
        ) : (
          <div className={"flex h-full w-full flex-col items-center justify-center gap-6"}>
            <div
              className={cn(
                "ease group flex h-full w-full flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed transition duration-200 hover:border-[#ffffff33]",
                isDragging ? "border-[#ffffff33]" : "border-[#ffffff1f]"
              )}
              onPaste={handleFilePaste}
              onDrop={handleDrop}
              onDragOver={handleDragover}
              onDragLeave={handleDragLeave}
            >
              {isDragging ? (
                <>
                  <Icons.image className={"pointer-events-none scale-150"} />
                  <div className={"pointer-events-none text-center"}>
                    <p className={"mb-1 text-[32px]"}>Drop image here</p>
                  </div>
                </>
              ) : (
                <>
                  <Icons.image />
                  <div className={"text-center"}>
                    <p className={"mb-1 text-[24px]"}>Drag an image here</p>
                    <p className={"text-[16px] text-muted-foreground"}>or click the button</p>
                  </div>
                  <div className={"flex items-center gap-6"}>
                    <Button onClick={() => document.getElementById("image").click()}>
                      Select File
                      <Label htmlFor={"image"} />
                      <Input
                        id={"image"}
                        type={"file"}
                        accept="image/png, image/gif, image/jpeg"
                        className={"hidden"}
                        onChange={handleSelectFile}
                      />
                    </Button>
                    <Button variant={"outline"} onClick={handlePasteClick}>
                      Paste from clipboard
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div className={"flex gap-4"}>
              <div className={"relative flex w-[440px] items-center"}>
                {searchUrl && (
                  <Button
                    className={
                      "group absolute right-2 !size-5 rounded-[50%] p-0 hover:bg-transparent"
                    }
                    variant={"ghost"}
                    onClick={() => setSearchUrl("")}
                  >
                    <XCircle
                      className={
                        "size-5 opacity-20 transition duration-200 ease-in-out group-hover:opacity-70"
                      }
                    />
                  </Button>
                )}
                <Input
                  className={"pr-8"}
                  value={searchUrl}
                  onChange={(e) => setSearchUrl(e.target.value)}
                />
              </div>
              <Button variant={"outline"} disabled={!searchUrl}>
                Search
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className={"flex items-center justify-center gap-8"}>
        <div className={`${isPending || !image ? "cursor-no-drop" : "cursor-pointer"}`}>
          <Button
            variant={"outline"}
            onClick={mutate}
            disabled={isPending || !image}
            className={"w-[200px]"}
          >
            {isPending ? "Uploading..." : "Upload Image"}
          </Button>
        </div>
        {isSuccess && data && (
          <a href={data?.data.data.image.url} target={"_blank"} rel="noreferrer">
            <Button variant={"outline"} className={"!size-11 rounded-[50%] p-0"}>
              <ExternalLink className={"size-5"} />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Packages;
