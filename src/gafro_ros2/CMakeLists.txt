cmake_minimum_required(VERSION 3.11)

find_program(CCACHE_PROGRAM ccache)
if(CCACHE_PROGRAM)
    set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE "${CCACHE_PROGRAM}")
endif()

project(gafro_ros2)

find_package(ament_cmake REQUIRED)

find_package(sackmesser_ros2 REQUIRED)
find_package(rclcpp REQUIRED)
find_package(geometry_msgs REQUIRED)
find_package(visualization_msgs REQUIRED)
find_package(nav_msgs REQUIRED)
find_package(gafro REQUIRED)
find_package(gafro_robot_descriptions REQUIRED)
find_package(urdf REQUIRED)

add_library(gafro_ros2 SHARED)

add_subdirectory(src/gafro_ros2)
add_subdirectory(apps)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  target_compile_options(gafro_ros2 PUBLIC -Wall -Wextra -Wpedantic -Werror)
endif()

target_include_directories(gafro_ros2
    PUBLIC
        $<BUILD_INTERFACE:${CMAKE_CURRENT_LIST_DIR}/src>
        $<INSTALL_INTERFACE:include/>
)

target_link_libraries(gafro_ros2
    PUBLIC
        rclcpp::rclcpp
        sackmesser_ros2::sackmesser_ros2
        ${geometry_msgs_TARGETS}
        ${visualization_msgs_TARGETS}
        ${nav_msgs_TARGETS}
        urdf::urdf
        gafro::gafro
        gafro_robot_descriptions::gafro_robot_descriptions
)

ament_export_targets(gafro_ros2-config-targets HAS_LIBRARY_TARGET)

ament_export_dependencies(
    rclcpp
    sackmesser_ros2
    geometry_msgs
    visualization_msgs
    nav_msgs
    urdf
)

install(
    TARGETS gafro_ros2
    EXPORT gafro_ros2-config-targets
    LIBRARY DESTINATION lib
)

ament_package()