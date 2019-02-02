package diriteration

import (
	"io/ioutil"
	"os"
)

// DirectoryRecursiveIteration iterate directories under 'dir' path which is a first argument.
//The second argument is a callback function which will be called when a file is met.
func DirectoryRecursiveIteration(
	dirPath string,
	do func(string),
) error {
	dirInfo, err := ioutil.ReadDir(dirPath)
	if err != nil {
		return err
	}

	err = directoryRecursiveIteration(dirPath, dirInfo, do)
	if err != nil {
		return err
	}

	return nil
}

func directoryRecursiveIteration(
	dirPath string,
	dirInfo []os.FileInfo,
	do func(string)) error {

	for _, subPathInfo := range dirInfo {
		subPath := dirPath + "/" + subPathInfo.Name()

		if !subPathInfo.IsDir() {
			do(subPath)
		} else {
			subDirInfo, err := ioutil.ReadDir(subPath)
			if err != nil {
				return err
			}

			err = directoryRecursiveIteration(subPath, subDirInfo, do)
			if err != nil {
				return err
			}
		}

	}

	return nil
}
