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
We use the base:
```bash
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update
sudo apt-get -y install cuda-toolkit-12-6=12.6.2-1
sudo apt-mark hold cuda-toolkit-12-6
```


## Cuda Compat
If your installed CUDA version is higher than the max supported CUDA in the driver (like in our case), you need to install the cuda compatibility package:
```bash
sudo apt-get install cuda-compat-12-6
```


## Librealsense

We used librealsense 2.56.5 debian packages:
```bash


```


## ROS 2
Our system uses [ROS2 Rolling - Debian Installation](https://docs.ros.org/en/rolling/Installation/Ubuntu-Install-Debs.html)


## Open3D-CUDA
We built Open3D-CUDA from source. You may need to replace the CMakeLists.txt in the project directory with docs/open3d-cuda/CMakeLists.txt as it toggles certain features off and ensures a smoother install:
```bash

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
```

## OpenMP
```bash
sudo apt install libomp-dev
```

