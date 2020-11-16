##### SETTINGS #####

export NAME="icon"
export SOURCE="./misc/icon1024.png"
export BUILD="./build"
export APP="./app"

##### END OF SETTINGS #####

export ICON="./$NAME.iconset"

rimraf $ICON
mkdir $ICON
mkdir -p $BUILD
sips -z 16 16     $SOURCE --out $ICON/icon_16x16.png
sips -z 32 32     $SOURCE --out $ICON/icon_16x16@2x.png
sips -z 32 32     $SOURCE --out $ICON/icon_32x32.png
sips -z 64 64     $SOURCE --out $ICON/icon_32x32@2x.png
sips -z 128 128   $SOURCE --out $ICON/icon_128x128.png
sips -z 256 256   $SOURCE --out $ICON/icon_128x128@2x.png
sips -z 256 256   $SOURCE --out $ICON/icon_256x256.png
sips -z 512 512   $SOURCE --out $ICON/icon_256x256@2x.png
sips -z 512 512   $SOURCE --out $ICON/icon_512x512.png
cp $ICON/icon_512x512.png $BUILD/icon.png
cp $ICON/icon_512x512.png $APP/icon.png
cp $SOURCE $ICON/icon_512x512@2x.png
iconutil -c icns $ICON
mv $NAME.icns $BUILD
rm -R $ICON
