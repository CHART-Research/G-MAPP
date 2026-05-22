# Running G-MAPP

Must source the built environment before running:
```bash
source install/setup.bash
```

## Run Perception

The perception node connects to the realsense depth sensors, and publishes to the `/pointcloud` topic.

### Configuring cameras for perception

- Static cameras can be setup with: [src/percept_core/config/static_cameras_setup.yaml](../src/percept_core/config/static_cameras_setup.yaml)
- Perception pipeline settings can be configured with: [src/percept_core/config/perception_pipeline_setup.yaml](../src/percept_core/config/perception_pipeline_setup.yaml)


## Run Planner


### Manipulator
- Manipulator planning configurations: [src/experiments/src/manipulator/manipulator_config.yaml](../src/experiments/src/manipulator/manipulator_config.yaml)

- Start/end configurations: [src/experiments/src/manipulator/manipulator_config.yaml](../src/experiments/src/manipulator/manipulator_config.yaml)

#### Launch Real World Experiment (RWE)
```bash
ros2 launch experiments rwe.py
```

#### Launch Simulation. Uses percept_core's [dynamic scene loader](../src/percept_core/src/tools/dynamic_scene_loader.py) (default) or [static scene loader](../src/percept_core/src/tools/static_scene_loader.py)
```bash
ros2 launch experiments sim_manip.py
```

Note: the dynamic and static scene loaders read their data from temp files

### Oriented pointmass

- Oriented pointmass planning configurations: [src/experiments/src/oriented_pointmass/config/oriented_pointmass_config.yaml](../src/experiments/src/oriented_pointmass/config/oriented_pointmass_config.yaml)
- Start/end goals: [src/experiments/src/oriented_pointmass/config/start_goal.yaml](../src/experiments/src/oriented_pointmass/config/start_goal.yaml)

#### Launch oriented pointmass
```bash
ros2 launch experiments sim_op.py
```

## Connection with physical robot

We use [panda-py](https://github.com/JeanElsner/panda-py) to control the robot. The panda-py node listens to the `/manipulator/pose` topic and publishes to the `/joint_states` topic. A simple [control node](../src/experiments/src/tools/panda_control.py) can be launched with
```bash
ros2 run experiments panda_control.py robot_ip:=<YOUR-ROBOT-IP-HERE>
```
Note: Running this command requires sourcing a separate panda-py environment with the library installed