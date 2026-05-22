## Ubuntu 24.04

Get a copy of the 24.04 Desktop OS from:
https://releases.ubuntu.com/noble/


## Kernel 6.8.0

As of this article, `librealsense` only works with an older kernel version on 24.04. Accordingly, the kernel can be replaced with:

```bash
sudo apt update
sudo apt install linux-image-6.8.0-110-generic linux-headers-6.8.0-110-generic linux-modules-extra-6.8.0-110-generic
```

Reboot the system and select the installed kernel with Advanced options for Ubuntu:
```bash
sudo reboot
```

Confirm correct kernel is loaded: 
```bash
uname -r
```

Uninstall other kernels (ensures stability):
```bash
dpkg --list | grep linux-image

sudo apt purge linux-image-6.11.0-XX-generic linux-headers-6.11.0-XX-generic

sudo apt autoremove --purge
```

XX = old kernel's id

Mark hold the kernel to prevent future auto-upgrades:
```bash
sudo apt-mark hold linux-image-6.8.0-110-generic linux-headers-6.8.0-110-generic
```

Update grub:
```bash
sudo update-grub
```

## Librealsense

We used librealsense 2.56.5 debian packages:
```bash
# Ensure the directory exists
sudo mkdir -p /etc/apt/keyrings

# Download and dearmor
curl -sSf https://librealsense.realsenseai.com/Debian/librealsenseai.asc | \
gpg --dearmor | sudo tee /etc/apt/keyrings/librealsenseai.gpg > /dev/null

sudo apt-get install apt-transport-https -y

echo "deb [signed-by=/etc/apt/keyrings/librealsenseai.gpg] https://librealsense.realsenseai.com/Debian/apt-repo `lsb_release -cs` main" | \
sudo tee /etc/apt/sources.list.d/librealsense.list
sudo apt-get update

sudo apt-get install librealsense2-dkms -y
sudo apt-get install librealsense2-utils -y
sudo apt-get install librealsense2-dev -y
sudo apt-get install librealsense2-dbg -y
```

## ROS 2
Our system uses [ROS2 Rolling - Debian Installation](https://docs.ros.org/en/rolling/Installation/Ubuntu-Install-Debs.html)

```bash
#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

locale  # check for UTF-8

sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

locale  # verify settings

sudo apt install software-properties-common -y
sudo add-apt-repository universe -y

sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

sudo apt update && sudo apt install ros-dev-tools -y

sudo apt update && sudo apt upgrade -y

sudo apt install ros-rolling-desktop  -y
sudo apt install python3-colcon-clean  -y
sudo apt install python3-colcon-common-extensions  -y

sudo rosdep init
rosdep update

echo 'source /opt/ros/rolling/setup.bash to activate'
```




## Nvidia Driver
We chose a lower Nvidia driver to ensure stability across ubuntu versions and features. A higher **stable** nvidia driver could be used instead

```bash
sudo apt update
sudo apt autoremove --purge 'nvidia-*' -y
sudo apt install nvidia-driver-535 -y
sudo apt install nvidia-utils-535 -y
dpkg -l | grep nvidia-driver-535
```


## CUDA 12.6
Download and install CUDA 12.6 into `usr/local/cuda`:
```bash
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update
sudo apt-get -y install cuda-toolkit-12-6=12.6.2-1
sudo apt-mark hold cuda-toolkit-12-6
```
Add CUDA to path:
```bash
echo 'export PATH=/usr/local/cuda/bin${PATH:+:${PATH}}' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}' >> ~/.bashrc
echo 'export CPATH=/usr/local/cuda/targets/x86_64-linux/include${CPATH:+:${CPATH}}' >> ~/.bashrc
```


If your installed CUDA version is higher than the max supported CUDA in the driver (like in our case), you need to install the cuda compatibility package:
```bash
sudo apt-get install cuda-compat-12-6
```



## Open3D-CUDA
We build Open3D-CUDA from source:
```bash
sudo apt install -y git build-essential cmake libgeos-dev -y

mkdir ~/userlibs && mkdir ~/userlibs/open3d && mkdir ~/userlibs/open3d/open3d_install

cd ~/userlibs/open3d

git clone --recursive https://github.com/isl-org/Open3D

./util/scripts/install-deps-ubuntu.sh

mkdir build && cd build

cmake \
-DBUILD_CUDA_MODULE=ON \
-DBUILD_COMMON_CUDA_ARCHS=OFF \
-DBUILD_EXAMPLES=OFF \
-DCMAKE_CUDA_ARCHITECTURES=native \
-DWITH_OPENMP=ON \
-DBUILD_WEBRTC=OFF \
-DBUILD_GUI=OFF \
-DCMAKE_BUILD_TYPE=Release \
-DBUILD_PYTHON_MODULE=OFF \
-DCMAKE_CXX_FLAGS="-Wno-error -Wno-maybe-uninitialized -Wno-array-bounds" \
-DCMAKE_INSTALL_PREFIX=~/userlibs/open3d/open3d_install \
..
```
You may need to replace the CMakeLists.txt in the project directory with [docs/open3d-cuda/CMakeLists.txt](open3d-cuda/CMakeLists.txt) as it toggles certain features off and ensuring a lighter and smoother install:
```bash
make -j$(nproc)
sudo make install
```
Save the path:
```bash
echo "export Open3D_DIR=$HOME/userlibs/open3d/open3d_install/lib/cmake/Open3D" >> ~/.bashrc
echo "export CMAKE_PREFIX_PATH=$HOME/userlibs/open3d/open3d_install:$CMAKE_PREFIX_PATH >> ~/.bashrc
```




## Clang
```bash
sudo apt install clang-18 lldb-18 lld-18

sudo update-alternatives --install /usr/bin/clang clang /usr/bin/clang-18 100
sudo update-alternatives --install /usr/bin/clang++ clang++ /usr/bin/clang++-18 100
```

## CycloneDDS
```bash
sudo apt install ros-$ROS_DISTRO-rmw-cyclonedds-cpp
echo "export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp" >> ~/.bashrc
```

## OpenMP
```bash
sudo apt install libomp-dev
```

