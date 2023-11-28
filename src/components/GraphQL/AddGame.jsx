import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { addGame } from "@/api/games.js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const AddGame = ({ toast, data }) => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [addMutation] = useMutation(addGame);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const platforms = ["PC", "PS4", "PS5", "Xbox", "Switch"];

  const manageSelected = (item) => {
    if (selectedPlatforms.includes(item)) {
      setSelectedPlatforms(selectedPlatforms.filter((platform) => platform !== item));
      return;
    }

    setSelectedPlatforms([...selectedPlatforms, item]);
  };

  const handleClose = () => {
    setTitle("");
    setSelectedPlatforms([]);
  };

  const handleAdd = async () => {
    if (title === "") {
      toast({
        description: "Must insert title!"
      });

      return;
    }
    if (selectedPlatforms.length === 0) {
      toast({
        description: "Must select at least one platform!"
      });

      return;
    }
    await addMutation({
      variables: { game: { title: title, platform: selectedPlatforms } },
      onCompleted: (apiResponse) => {
        const { response, game } = apiResponse.addGame;
        if (response.success) {
          data.game = data.games.push(game);
          setSelectedPlatforms([]);
          setTitle("");
          setOpen(false);
        }
        toast(
          response.success
            ? {
                description: response.message
              }
            : {
                variant: "destructive",
                description: response.message
              }
        );
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          description: error.message
        });
      }
    });
  };

  return (
    <Card className={"flex h-[180px] w-[300px] flex-col items-center justify-center border-dashed"}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"} className={"w-[130px] border-dashed"}>
            Add Game
          </Button>
        </DialogTrigger>
        <DialogContent className={"h-[400px] max-w-[350px] sm:max-w-[400px]"}>
          <DialogHeader>
            <p className={"text-xl font-semibold"}>Add a new game</p>
          </DialogHeader>
          <div className={" flex flex-col gap-4"}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title" className={"pl-2 text-lg text-foreground"}>
                Title
              </Label>
              <Input placeholder={"Enter a title"} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="platforms" className={"pl-2 text-lg text-foreground"}>
                Platforms
              </Label>
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"} className={"w-full tracking-wide"}>
                    Select Platforms
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={"flex w-72 flex-col gap-2 sm:w-80"}>
                  <div className={"flex h-[14px] w-full flex-row justify-end pr-2"}>
                    <X
                      className={"w-[20px] cursor-pointer"}
                      onClick={() => setDropdownOpen(false)}
                    />
                  </div>
                  {platforms.map((item, index) => (
                    <div
                      key={index}
                      className={"flex flex-row items-center gap-6 rounded-sm pl-6 hover:bg-accent"}
                    >
                      {selectedPlatforms.includes(item) ? (
                        <Check className={"w-[20px] text-green-500"} />
                      ) : (
                        <span className={"w-[20px]"} />
                      )}
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          manageSelected(item);
                        }}
                        className={"w-full cursor-pointer"}
                      >
                        {item}
                      </DropdownMenuItem>
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <DialogFooter className={"gap-2"}>
            <Button variant={"outline"} onClick={handleAdd}>
              Add Game
            </Button>
            <DialogClose onClick={handleClose} on>
              <Button variant={"outline"}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

AddGame.propTypes = {
  toast: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default AddGame;
