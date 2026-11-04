package com.example.backend.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.backend.entity.SealEntity;
import org.mapstruct.Mapper;

/**
 * 签章映射器接口
 */
@Mapper
public interface SealMapper extends BaseMapper<SealEntity> {
}
