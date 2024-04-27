package com.cnweb36.Config;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configurable
@EnableTransactionManagement
@EnableJpaRepositories
@EnableJpaAuditing
public class JpaAuditingConfig {

}
