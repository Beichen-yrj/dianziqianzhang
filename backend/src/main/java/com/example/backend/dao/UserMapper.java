package com.example.backend.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.backend.entity.UserEntity;
import org.mapstruct.Mapper;

/**
 * 用户映射器接口
 */
@Mapper
public interface UserMapper extends BaseMapper<UserEntity> {
}
