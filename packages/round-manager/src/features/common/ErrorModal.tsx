import React, {Fragment} from "react"
import {Dialog, Transition} from "@headlessui/react"
import {Button} from "./styles";

interface ErrorModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  heading?: string;
  subheading?: string;
  tryAgainFn?: () => void
}

export default function ErrorModal(
  {
    isOpen,
    setIsOpen,
    heading = "Error",
    subheading = "There has been a systems error during the deployment of your Grant Program.",
    tryAgainFn = () => {}
  }: ErrorModalProps
) {

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" data-testid="error-modal" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-grey-400 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start flex-col">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                    <Dialog.Title as="h3" className="text-base leading-6 font-semibold text-grey-500" data-testid='error-heading'>
                      {heading}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-grey-400" data-testid='error-message' >
                        {subheading}
                      </p>
                    </div>
                  </div>
                  <div className="self-end mt-12">
                    <Button
                      type="button"
                      $variant="outline"
                      data-testid="tryAgain"
                      onClick={() => {
                        tryAgainFn()
                        setIsOpen(false)
                      }}
                    >Try Again</Button>
                    <Button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      data-testid="done"
                    >Done</Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
