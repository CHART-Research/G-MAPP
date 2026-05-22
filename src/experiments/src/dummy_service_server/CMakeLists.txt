add_executable(dummy_service_server dummy_service_server.cpp)

target_compile_options(dummy_service_server PUBLIC -Wall -Wextra -Wpedantic -Werror)

target_link_libraries(dummy_service_server
  PUBLIC
    sackmesser_ros2::sackmesser_ros2
    message_interface
)

ament_export_dependencies(
  sackmesser_ros2
)

install(
  TARGETS 
    dummy_service_server
  DESTINATION
    lib/${PROJECT_NAME}
)

install(
  FILES
    dummy_service_server_config.yaml
  DESTINATION 
    share/${PROJECT_NAME}/dummy_service_server/
)